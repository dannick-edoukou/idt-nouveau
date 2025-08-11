"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Send, CheckCircle, AlertCircle, Phone, Mail, MapPin, Clock } from "lucide-react"
import DynamicHero from "./DynamicHero"

// Schéma de validation
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

const SUBJECT_OPTIONS = [
  { value: "diffusion", label: "Diffusion TNT/Radio", description: "Questions sur nos services de diffusion" },
  { value: "infrastructure", label: "Infrastructure", description: "Location de pylônes et équipements" },
  { value: "ott", label: "Services OTT", description: "Streaming et services numériques" },
  { value: "autre", label: "Autre demande", description: "Toute autre question" },
]

const CONTACT_INFO = [
  {
    icon: MapPin,
    title: "Adresse",
    content: (
      <>
        28 BP 1400 Abidjan 28 COTE D'IVOIRE<br />
        II Plateaux derrière l'ENA, Rue J15.<br />
        <a
          href="https://maps.app.goo.gl/D6Zir7oj69YAQbU68?g_st=ipc"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-orange-200 hover:text-white"
        >
          Localisation sur Google Maps
        </a>
      </>
    ),
  },
  { icon: Phone, title: "Téléphone", content: "+225 25 22 01 05 00" },
  { icon: Mail, title: "Email", content: "contact@sidt.ci" },
  {
    icon: Clock,
    title: "Horaires",
    content: (
      <>
        Lun - Ven: 8h00 - 18h00<br />
        Support 24/7 pour urgences
      </>
    ),
  },
]

// Composant pour les messages de statut
const StatusMessage = ({ status, errorMessage }: { status: string; errorMessage: string }) => {
  if (status === "success") {
    return (
      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
        <div>
          <p className="text-green-800 font-medium text-sm">Message envoyé avec succès !</p>
          <p className="text-green-600 text-xs">
            Nous vous répondrons dans les plus brefs délais. Un email de confirmation vous a été envoyé.
          </p>
        </div>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
        <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
        <div>
          <p className="text-red-800 font-medium text-sm">Erreur lors de l'envoi</p>
          <p className="text-red-600 text-xs">
            {errorMessage || "Veuillez réessayer ou nous contacter directement."}
          </p>
        </div>
      </div>
    )
  }

  return null
}

// Composant pour les champs de saisie
const FormField = ({ label, error, children, required = false }: {
  label: string
  error?: string
  children: React.ReactNode
  required?: boolean
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && "*"}
    </label>
    {children}
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
)

// Composant pour les informations de contact
const ContactInfo = () => (
  <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 sm:p-6 text-white">
    <div className="h-full flex flex-col">
      <div>
        <h3 className="text-lg sm:text-xl font-bold mb-3">Contactez-nous</h3>
        <p className="text-orange-100 mb-4 text-sm">
          Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions concernant nos
          services de diffusion et d'infrastructure.
        </p>
      </div>

      <div className="space-y-3 mb-4">
        {CONTACT_INFO.map(({ icon: Icon, title, content }, index) => (
          <div key={index} className="flex items-start space-x-2 sm:space-x-3">
            <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-orange-200 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-sm mb-0.5">{title}</h4>
              <p className="text-orange-100 text-xs sm:text-sm">{content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <div className="border-t border-orange-400 pt-3">
          <p className="text-orange-100 text-xs">
            Temps de réponse moyen: <strong>2 heures</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
)

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
    defaultValues: { newsletter: false },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus("success")
        reset()
      } else {
        setErrorMessage(result.message || "Une erreur s'est produite lors de l'envoi")
        setSubmitStatus("error")
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Une erreur s'est produite lors de l'envoi"
      setErrorMessage(message)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass = (hasError: boolean) =>
    `w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
      hasError ? "border-red-500" : "border-gray-300"
    }`

  return (
    <>
      <DynamicHero backgroundImage="/heroes.jpeg" />
      
      <div className="bg-gray-50">
        <div className="w-full max-w-6xl mx-auto p-2 sm:p-3">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 xl:grid-cols-2">
              <ContactInfo />

              {/* Formulaire */}
              <div className="p-4 sm:p-6">
                <StatusMessage status={submitStatus} errorMessage={errorMessage} />

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Nom et Prénom */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Prénom" error={errors.firstName?.message} required>
                      <input
                        {...register("firstName")}
                        type="text"
                        className={inputClass(!!errors.firstName)}
                        placeholder="Votre prénom"
                      />
                    </FormField>

                    <FormField label="Nom" error={errors.lastName?.message} required>
                      <input
                        {...register("lastName")}
                        type="text"
                        className={inputClass(!!errors.lastName)}
                        placeholder="Votre nom"
                      />
                    </FormField>
                  </div>

                  {/* Email et Téléphone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Email" error={errors.email?.message} required>
                      <input
                        {...register("email")}
                        type="email"
                        className={inputClass(!!errors.email)}
                        placeholder="votre@email.com"
                      />
                    </FormField>

                    <FormField label="Téléphone">
                      <input
                        {...register("phone")}
                        type="tel"
                        className={inputClass(false)}
                        placeholder="+225 25 22 01 05 00"
                      />
                    </FormField>
                  </div>

                  {/* Entreprise */}
                  <FormField label="Entreprise">
                    <input
                      {...register("company")}
                      type="text"
                      className={inputClass(false)}
                      placeholder="Nom de votre entreprise"
                    />
                  </FormField>

                  {/* Type de demande */}
                  <FormField label="Type de demande" error={errors.subject?.message} required>
                    <select {...register("subject")} className={inputClass(!!errors.subject)}>
                      <option value="">Sélectionnez un type de demande</option>
                      {SUBJECT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {watch("subject") && (
                      <p className="mt-1 text-xs text-gray-600">
                        {SUBJECT_OPTIONS.find((opt) => opt.value === watch("subject"))?.description}
                      </p>
                    )}
                  </FormField>

                  {/* Message */}
                  <FormField label="Message" error={errors.message?.message} required>
                    <textarea
                      {...register("message")}
                      rows={4}
                      className={`${inputClass(!!errors.message)} resize-vertical`}
                      placeholder="Décrivez votre demande en détail..."
                    />
                  </FormField>

                  {/* Newsletter */}
                  <div className="flex items-start space-x-2">
                    <input
                      {...register("newsletter")}
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <label className="text-xs text-gray-700">
                      Je souhaite recevoir les actualités et informations d'IDT par email
                    </label>
                  </div>

                  {/* Bouton de soumission */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-2.5 px-4 text-sm rounded-md hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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