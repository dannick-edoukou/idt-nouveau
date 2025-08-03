'use client'
import Image from 'next/image'
import React from 'react'
import { Facebook, Twitter, Linkedin, Youtube, Phone, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  const navigationLinks = {
    entreprise: {
      title: 'Entreprise',
      links: [
        { title: 'Présentation', href: '/presentation' },
        { title: 'Mot du DG', href: '/mot-du-dg' },
        { title: 'Nos Missions', href: '/nos-missions' },
        { title: 'Fonctionnement', href: '/fonctionnement' },
        { title: 'Document juridique', href: '/document-juridique' }
      ]
    },
    latnt: {
      title: 'La TNT',
      links: [
        { title: 'Les Chaînes', href: '/les-chaines' },
        { title: 'FAQ', href: '/faq' }
      ]
    },
    autreservice: {
      title: 'Autres Services',
      links: [
        { title: 'Radio', href: '/radio' },
        { title: 'Pylone', href: '/pylone' },
        { title: 'OTT', href: '/ott' }
      ]
    },
    mediatheque: {
      title: 'Médiathèque',
      links: [
        { title: 'Photothèque', href: '/mediatheque/phototheque' },
        { title: 'Vidéothèque', href: '/mediatheque/videotheque' }
      ]
    }
  }

  const socialLinks = [
    { icon: Youtube, href: 'https://www.youtube.com/@idt-societeivoiriennedetel9946', name: 'YouTube' },
    { icon: Linkedin, href: 'https://ci.linkedin.com/company/societe-ivoirienne-de-telediffusion', name: 'LinkedIn' },
    { icon: Facebook, href: 'https://www.facebook.com/idt.ci', name: 'Facebook' },
    { icon: Twitter, href: 'https://x.com/idt_ci', name: 'Twitter' }
  ]

  return (
    <footer className="bg-gradient-to-b from-white to-orange-500 text-gray-800">
      {/* Section principale du footer */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 flex justify-around ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Logo et description */}
          <div className="lg:col-span-1">
            <Image
              src="/logo.jpg"
              alt="IDT Logo"
              width={120}
              height={80}
              className="hover:opacity-80 transition-opacity duration-200"
            />
            <p className="text-gray-700 mb-4 mt-4">
            La Société Ivoirienne de Télédiffusion IDT assure la diffusion des programmes 
            radiophoniques et télévisuels sur le territoire national.
            </p>

            {/* Réseaux sociaux */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-white transition-colors duration-300"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Liens de navigation */}
          {Object.entries(navigationLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white pb-2">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-gray-700 hover:text-white transition-colors duration-300 block py-1 text-left w-full"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Informations de contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white pb-2">
              Contact
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                <div className="text-gray-700">
                  <p>Société Ivoirienne de Télédiffusion</p>
                  <p>28 BP 1400 Abidjan 28</p>
                  <p>II Plateaux derrière l'ENA</p>
                  <p>Rue J15, Côte d'Ivoire</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-white flex-shrink-0" />
                <Link
                  href="tel:+2252522010500"
                  className="text-gray-700 hover:text-white transition-colors duration-300"
                >
                  +225 25 22 01 05 00
                </Link>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-white flex-shrink-0" />
                <Link
                  href="mailto:contact@sidt.ci"
                  className="text-gray-700 hover:text-white transition-colors duration-300"
                >
                  contact@sidt.ci
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barre du bas */}
      <div className="border-t border-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

            {/* Copyright */}
            <div className="text-gray-700">
              <p>&copy; 2025 Société Ivoirienne de Télédiffusion. </p>
            </div>

            {/* Liens légaux */}
            <div className="flex space-x-6 text-sm">
           
              <p className="text-gray-700 hover:text-white transition-colors duration-300">
              Tous droits réservés.
              </p>
              <button type="button" className="text-gray-700 hover:text-white transition-colors duration-300">
                par Optinov
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer