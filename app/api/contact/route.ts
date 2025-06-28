

import { NextRequest, NextResponse } from 'next/server'
import * as nodemailer from 'nodemailer'
import { z } from 'zod'

const contactSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.enum(["diffusion", "infrastructure", "ott", "autre"]),
  message: z.string().min(10, "Votre message doit contenir au moins 10 caractères"),
  newsletter: z.boolean().optional(),
})

// Configuration du transporteur Nodemailer
const createTransporter = () => {
  // Vérification des variables d'environnement essentielles
  if (!process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD || !process.env.EMAIL_TO) {
    console.error("Variables d'environnement pour l'email manquantes.");
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_SERVER_PORT) || 587,
    secure: false, // La plupart des serveurs sur le port 587 utilisent STARTTLS
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    // Validation des données
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // Création du transporteur
    const transporter = createTransporter();

    if (!transporter) {
      console.error('Échec de la création du transporteur, vérifiez la configuration des emails.');
      return NextResponse.json(
        { success: false, message: "La configuration du serveur d'email est incomplète." },
        { status: 500 }
      );
    }

    // Vérification de la connexion
    await transporter.verify();

    const subjectLabels = {
      diffusion: "Diffusion TNT/Radio",
      infrastructure: "Infrastructure",
      ott: "Services OTT",
      autre: "Autre demande"
    }

    // Configuration de l'email
    const mailOptions = {
      from: `"${validatedData.firstName} ${validatedData.lastName}" <${process.env.EMAIL_SERVER_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: validatedData.email,
      subject: `[Contact IDT] ${subjectLabels[validatedData.subject]} - ${validatedData.firstName} ${validatedData.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ea580c; border-bottom: 2px solid #ea580c; padding-bottom: 10px;">
            Nouveau message de contact - IDT
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Informations du contact</h3>
            <p><strong>Nom complet:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            ${validatedData.phone ? `<p><strong>Téléphone:</strong> ${validatedData.phone}</p>` : ''}
            ${validatedData.company ? `<p><strong>Entreprise:</strong> ${validatedData.company}</p>` : ''}
            <p><strong>Type de demande:</strong> ${subjectLabels[validatedData.subject]}</p>
            <p><strong>Newsletter:</strong> ${validatedData.newsletter ? 'Oui' : 'Non'}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #ea580c; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; white-space: pre-line;">${validatedData.message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>Ce message a été envoyé depuis le formulaire de contact du site IDT le ${new Date().toLocaleString('fr-FR')}.</p>
          </div>
        </div>
      `,
      text: `
        Nouveau message de contact - IDT
        
        Informations du contact:
        Nom complet: ${validatedData.firstName} ${validatedData.lastName}
        Email: ${validatedData.email}
        ${validatedData.phone ? `Téléphone: ${validatedData.phone}` : ''}
        ${validatedData.company ? `Entreprise: ${validatedData.company}` : ''}
        Type de demande: ${subjectLabels[validatedData.subject]}
        Newsletter: ${validatedData.newsletter ? 'Oui' : 'Non'}
        
        Message:
        ${validatedData.message}
        
        Envoyé le ${new Date().toLocaleString('fr-FR')}
      `
    }

    // Envoi de l'email
    const info = await transporter.sendMail(mailOptions)
    
    console.log('Email envoyé avec succès:', info.messageId)

    // Email de confirmation pour l'utilisateur (optionnel)
    const confirmationMailOptions = {
      from: `"IDT - Institut de Diffusion Télévisuelle" <${process.env.EMAIL_SERVER_USER}>`,
      to: validatedData.email,
      subject: 'Confirmation de réception de votre message - IDT',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ea580c;">Merci pour votre message !</h2>
          <p>Bonjour ${validatedData.firstName},</p>
          <p>Nous avons bien reçu votre message concernant <strong>${subjectLabels[validatedData.subject]}</strong>.</p>
          <p>Notre équipe vous répondra dans les plus brefs délais, généralement sous 2 heures ouvrées.</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Récapitulatif de votre demande:</h3>
            <p><strong>Type:</strong> ${subjectLabels[validatedData.subject]}</p>
            <p><strong>Message:</strong></p>
            <p style="font-style: italic;">"${validatedData.message.substring(0, 200)}${validatedData.message.length > 200 ? '...' : ''}"</p>
          </div>
          
          <p>Cordialement,<br>L'équipe IDT</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>Institut de Diffusion Télévisuelle<br>
            123 Avenue de la Télédiffusion<br>
            75001 Paris, France<br>
            Tél: +33 1 23 45 67 89</p>
          </div>
        </div>
      `
    }

    await transporter.sendMail(confirmationMailOptions)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email envoyé avec succès',
        messageId: info.messageId 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Données invalides',
          errors: error.errors 
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur lors de l\'envoi de l\'email',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    )
  }
}