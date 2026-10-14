import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TO = process.env.CONTACT_EMAIL ?? "contato@miriamadvocacia.com.br";
const FROM = process.env.FROM_EMAIL ?? "contato@miriamadvocacia.com.br";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      return Response.json({ error: "Serviço de e-mail não configurado." }, { status: 500 });
    }

    const { name, phone, email, subject, message } = await request.json();

    if (!name || !phone || !email || !subject || !message) {
      return Response.json({ error: "Preencha todos os campos." }, { status: 400 });
    }

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Novo contato — ${subject}`,
      html: `
        <h2>Novo contato pelo site</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>WhatsApp:</strong> ${phone}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${subject}</p>
        <p><strong>Mensagem:</strong><br/>${message}</p>
      `,
    });

    if (error || !data?.id) {
      return Response.json({ error: "Não foi possível enviar o e-mail." }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Erro interno." }, { status: 500 });
  }
}
