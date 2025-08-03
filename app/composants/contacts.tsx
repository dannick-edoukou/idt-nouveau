"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Send, CheckCircle, AlertCircle, Phone, Mail, MapPin, Clock } from "lucide-react"
import DynamicHero from "./DynamicHero";

// Schéma de validation avec Zod
const contactSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.enum(["diffusion", "infrastructure", "ott", "autre"], {
    errorMap: () => ({ message: "Veuillez sélectionner un type de demande" }),
  }),
  message: z.string().min(10, "Votre message doit contenir au moins 10 caractères"),
  newsletter: z.boolean().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      newsletter: false,
    },
  })

  const subjectOptions = [
    { value: "diffusion", label: "Diffusion TNT/Radio", description: "Questions sur nos services de diffusion" },
    { value: "infrastructure", label: "Infrastructure", description: "Location de pylônes et équipements" },
    { value: "ott", label: "Services OTT", description: "Streaming et services numériques" },
    { value: "autre", label: "Autre demande", description: "Toute autre question" },
  ]

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      console.log("Envoi du formulaire avec les données:", data)

      // Appel à votre API route Nodemailer
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        console.log("Email envoyé avec succès via Nodemailer")
        setSubmitStatus("success")
        reset()
      } else {
        console.error("Erreur lors de l'envoi:", result)
        setErrorMessage(result.message || "Une erreur s'est produite lors de l'envoi")
        setSubmitStatus("error")
      }
    } catch (error: unknown) {
      console.error("Erreur lors de l'envoi:", error)
      if (typeof error === 'object' && error !== null && 'message' in error) {
        setErrorMessage((error as { message?: string }).message || "Une erreur s'est produite lors de l'envoi");
      } else {
        setErrorMessage("Une erreur s'est produite lors de l'envoi");
      }
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Hero section sans marge */}
      <DynamicHero backgroundImage="/heroes.jpeg"/>
      
      {/* Section contact collée au hero */}
      <div className="bg-gray-50">
        <div className="w-full max-w-7xl mx-auto p-2 sm:p-4 lg:p-6">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 xl:grid-cols-2">
              {/* Informations de contact */}
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6 sm:p-8 lg:p-12 text-white">
                <div className="h-full flex flex-col">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Contactez-nous</h3>
                    <p className="text-orange-100 mb-6 sm:mb-8 text-sm sm:text-base">
                      Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions concernant nos
                      services de diffusion et d'infrastructure.
                    </p>
                  </div>

                  <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-orange-200 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Adresse</h4>
                        <p className="text-orange-100">
                          28 BP 1400 Abidjan 28 COTE D'IVOIRE
                          <br />
                          II Plateaux derrière l'ENA, Rue J15.
                          <br />
                          <a
                            href="https://maps.app.goo.gl/D6Zir7oj69YAQbU68?g_st=ipc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-orange-200 hover:text-white"
                          >
                            Localisation sur Google Maps
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-orange-200 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Téléphone</h4>
                        <p className="text-orange-100">+225 25 22 01 05 00</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-orange-200 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Email</h4>
                        <p className="text-orange-100">contact@sidt.ci</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-orange-200 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Horaires</h4>
                        <p className="text-orange-100">
                          Lun - Ven: 8h00 - 18h00
                          <br />
                          Support 24/7 pour urgences
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="border-t border-orange-400 pt-6">
                      <p className="text-orange-100 text-sm">
                        Temps de réponse moyen: <strong>2 heures</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulaire */}
              <div className="p-6 sm:p-8 lg:p-12">
                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <div>
                      <p className="text-green-800 font-medium">Message envoyé avec succès !</p>
                      <p className="text-green-600 text-sm">
                        Nous vous répondrons dans les plus brefs délais. Un email de confirmation vous a été envoyé.
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <div>
                      <p className="text-red-800 font-medium">Erreur lors de l'envoi</p>
                      <p className="text-red-600 text-sm">
                        {errorMessage || "Veuillez réessayer ou nous contacter directement."}
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Nom et Prénom */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        Prénom *
                      </label>
                      <input
                        {...register("firstName")}
                        type="text"
                        id="firstName"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
                          errors.firstName ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Votre prénom"
                      />
                      {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Nom *
                      </label>
                      <input
                        {...register("lastName")}
                        type="text"
                        id="lastName"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
                          errors.lastName ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Votre nom"
                      />
                      {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
                    </div>
                  </div>

                  {/* Email et Téléphone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        id="email"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="votre@email.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        id="phone"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                        placeholder="+225 25 22 01 05 00"
                      />
                    </div>
                  </div>

                  {/* Entreprise */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Entreprise
                    </label>
                    <input
                      {...register("company")}
                      type="text"
                      id="company"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>

                  {/* Type de demande */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Type de demande *
                    </label>
                    <select
                      {...register("subject")}
                      id="subject"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
                        errors.subject ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Sélectionnez un type de demande</option>
                      {subjectOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>}
                    {watch("subject") && (
                      <p className="mt-1 text-sm text-gray-600">
                        {subjectOptions.find((opt) => opt.value === watch("subject"))?.description}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      {...register("message")}
                      id="message"
                      rows={5}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors resize-vertical ${
                        errors.message ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Décrivez votre demande en détail..."
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
                  </div>

                  {/* Newsletter */}
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <input
                      {...register("newsletter")}
                      type="checkbox"
                      id="newsletter"
                      className="mt-1 h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <label htmlFor="newsletter" className="text-sm text-gray-700">
                      Je souhaite recevoir les actualités et informations d'IDT par email
                    </label>
                  </div>

                  {/* Bouton de soumission */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-4 sm:px-6 rounded-md hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Envoyer le message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactForm