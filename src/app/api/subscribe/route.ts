/**
 * Inscription email -> Brevo (ex-Sendinblue).
 * Variables d'environnement à définir sur Vercel :
 *   BREVO_API_KEY  (obligatoire)  : clé API v3 du compte Brevo.
 *   BREVO_LIST_ID  (optionnel)    : id de la liste où ajouter le contact.
 * Tant que BREVO_API_KEY n'est pas définie, l'inscription renvoie une erreur propre.
 */

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  const data = (body ?? {}) as { email?: unknown; source?: unknown };
  const email = String(data.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return Response.json({ error: "Adresse email invalide." }, { status: 400 });
  }
  const source = typeof data.source === "string" ? data.source.slice(0, 60) : undefined;

  const key = process.env.BREVO_API_KEY;
  if (!key) {
    return Response.json({ error: "Inscription momentanément indisponible." }, { status: 503 });
  }
  const listId = process.env.BREVO_LIST_ID ? Number(process.env.BREVO_LIST_ID) : undefined;

  try {
    const r = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": key,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email,
        updateEnabled: true,
        ...(listId && !Number.isNaN(listId) ? { listIds: [listId] } : {}),
        ...(source ? { attributes: { SOURCE: source } } : {}),
      }),
    });

    if (r.ok) return Response.json({ ok: true });

    // Contact déjà présent : on considère que c'est un succès.
    const d = (await r.json().catch(() => ({}))) as { code?: string };
    if (r.status === 400 && d?.code === "duplicate_parameter") {
      return Response.json({ ok: true });
    }
    return Response.json({ error: "Inscription impossible pour le moment." }, { status: 502 });
  } catch {
    return Response.json({ error: "Service indisponible." }, { status: 502 });
  }
}
