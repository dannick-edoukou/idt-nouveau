'use client'
import Image from 'next/image'
import React from 'react'
import { Facebook, Twitter, Linkedin, Youtube, Phone, Mail, MapPin } from 'lucide-react'

const Footer = () => {
  const navigationLinks = {
    idt: {
      title: 'IDT',
      links: [
        'Présentation',
        'Mot du DG',
        'Nos Missions',
        'Fonctionnement',
        'Document juridique'
      ]
    },
    services: {
      title: 'Nos Services',
      links: [
        'Diffusion TNT',
        'Diffusion Radio',
        'Location de pylone',
        'OTT'
      ]
    },
    media: {
      title: 'Média & Communication',
      links: [
        'Chaînes TV',
        'Bouquets TV',
        'Radios',
        'Actualités',
        'Photothèque',
        'Vidéothèque'
      ]
    }
  }

  const socialLinks = [
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' },
    { icon: Youtube, href: '#', name: 'YouTube' }
  ]

  return (
    <footer className="bg-gradient-to-b from-white to-orange-500 text-gray-800">
      {/* Section principale du footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            <p className="text-gray-700 mb-4">
              Institut de Diffusion Télévisuelle - Leader dans la diffusion de contenus audiovisuels
              et la gestion des infrastructures de télécommunication.
            </p>

            {/* Réseaux sociaux */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
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
                  <li key={link}>
                    <button
                      type="button"
                      className="text-gray-700 hover:text-white transition-colors duration-300 block py-1 text-left w-full"
                    >
                      {link}
                    </button>
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
                  <p>Institut de Diffusion Télévisuelle</p>
                  <p>123 Avenue de la Télédiffusion</p>
                  <p>75001 Paris, France</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-white flex-shrink-0" />
                <a
                  href="tel:+33123456789"
                  className="text-gray-700 hover:text-white transition-colors duration-300"
                >
                  +33 1 23 45 67 89
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-white flex-shrink-0" />
                <a
                  href="mailto:contact@idt.fr"
                  className="text-gray-700 hover:text-white transition-colors duration-300"
                >
                  contact@idt.fr
                </a>
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
              <p>&copy; {new Date().getFullYear()} Institut de Diffusion Télévisuelle. Tous droits réservés.</p>
            </div>

            {/* Liens légaux */}
            <div className="flex space-x-6 text-sm">
              <button type="button" className="text-gray-700 hover:text-white transition-colors duration-300">
                Mentions légales
              </button>
              <button type="button" className="text-gray-700 hover:text-white transition-colors duration-300">
                Politique de confidentialité
              </button>
              <button type="button" className="text-gray-700 hover:text-white transition-colors duration-300">
                Cookies
              </button>
              <button type="button" className="text-gray-700 hover:text-white transition-colors duration-300">
                Plan du site
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer