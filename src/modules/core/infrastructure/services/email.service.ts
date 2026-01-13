import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

export interface EmailService {
  enviarCodigoVerificacao(email: string, codigo: string): Promise<void>;
}

@Injectable()
export class EmailServiceImpl implements EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS, // Use App Password, not regular password
    },
  });

  async enviarCodigoVerificacao(email: string, codigo: string): Promise<void> {
    const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Código de Verificação - Planejai</title>
      <style>
        body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); color: #ffffff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .card { background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%); border: 1px solid rgba(147,51,234,0.3); border-radius: 20px; padding: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.6); backdrop-filter: blur(10px); }
        .header { text-align: center; margin-bottom: 32px; }
        .logo { font-size: 36px; font-weight: bold; color: #8b5cf6; margin-bottom: 8px; }
        .subtitle { font-size: 18px; color: #a1a1aa; }
        .greeting { font-size: 16px; color: #000000; text-align: center; margin-bottom: 24px; }
        .code-container { text-align: center; margin: 24px 0; }
        .code { font-size: 36px; font-weight: bold; color: #000000; background: linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(147,51,234,0.1) 100%); padding: 20px; border-radius: 12px; border: 1px solid rgba(147,51,234,0.4); display: inline-block; letter-spacing: 4px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.3); }
        .info { font-size: 14px; color: #a1a1aa; text-align: center; margin: 16px 0; }
        .warning { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); border-radius: 8px; padding: 12px; margin: 16px 0; text-align: center; color: #fca5a5; font-size: 14px; }
        .footer { margin-top: 32px; text-align: center; font-size: 12px; color: #71717a; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="header">
            <div class="logo">Planejai</div>
            <div class="subtitle">Verificação de Conta</div>
          </div>
          <p class="greeting">Olá! Bem-vindo ao Planejai. Use o código abaixo para verificar sua conta e começar a gerenciar suas finanças.</p>
          <div class="code-container">
            <div class="code">${codigo}</div>
          </div>
          <p class="info">Este código expira em 15 minutos. Digite-o na tela de verificação para continuar.</p>
          <div class="warning">
            <strong>Atenção:</strong> Não compartilhe este código com ninguém. Se você não solicitou, ignore este email.
          </div>
          <div class="footer">
            <p>Precisa de ajuda? Entre em contato conosco.</p>
            <p>&copy; 2026 Planejai. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Código de Verificação - Planejai',
      text: `Seu código de verificação é: ${codigo}. Este código expira em 15 minutos.`,
      html: html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Código de verificação enviado para ${email}`);
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      throw new Error('Falha ao enviar email de verificação');
    }
  }
}
