'use client'
import Image from 'next/image'
import React from 'react'
import { Facebook, Twitter, Linkedin, Youtube, Phone, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  type NavLink = {
    title: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
    type?: 'address' | 'phone' | 'email'
  }
  type NavigationLinkSection = {
    title: string
    links: NavLink[]
  }
  const navigationLinks: Record<string, NavigationLinkSection> = {
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
    },
    contact: {
      title: 'Contact',
      links: [
        { 
          title: 'IDT - 28 BP 1400 Abidjan 28, II Plateaux, Rue J15', 
          href: '#',
          icon: MapPin,
          type: 'address'
        },
        { 
          title: '+225 25 22 01 05 00', 
          href: 'tel:+2252522010500',
          icon: Phone,
          type: 'phone'
        },
        { 
          title: 'contact@sidt.ci', 
          href: 'mailto:contact@sidt.ci',
          icon: Mail,
          type: 'email'
        }
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
      <div className="px-4 sm:px-6 lg:px-8 py-6 flex flex-col">
        <div className="w-full flex flex-col lg:flex-row justify-center gap-8">
          {/* Logo et description */}
          <div className="flex flex-col items-center lg:items-start lg:mr-8 mb-6 lg:mb-0">
            <Image
              src="/logo.png"
              alt="IDT Logo"
              width={100}
              height={60}
              className="hover:opacity-80 transition-opacity duration-200"
            />
            <p className="text-gray-700 mb-2 mt-2 text-sm leading-tight text-center lg:text-left">
              La Société Ivoirienne de Télédiffusion IDT assure la diffusion des programmes 
              radiophoniques et télévisuels sur le territoire national.
            </p>
            {/* Réseaux sociaux */}
            <div className="flex space-x-3 justify-center lg:justify-start">
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
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Liens de navigation incluant Contact - titres alignés à gauche, sous-liens alignés à gauche */}
          <div className="w-full flex flex-wrap justify-center gap-8">
            {Object.entries(navigationLinks).map(([key, section]) => (
              <div key={key} className="min-w-[150px] flex flex-col ">
                <h3 className="text-base font-semibold text-gray-800 mb-2 border-b border-white pb-1 text-left">
                  {section.title}
                </h3>
                <ul className="space-y-1 w-full">
                  {section.links.map((link, index) => (
                    <li key={index} className="w-full">
                      {key === 'contact' ? (
                        <div className={`flex items-start space-x-2 ${link.type === 'address' ? 'mb-2' : 'mb-1'}`}>
                          {link.icon && (
                            <link.icon className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                          )}
                          {link.type === 'address' ? (
                            <div className="text-gray-700 text-sm">
                              <p>IDT - 28 BP 1400 Abidjan 28</p>
                              <p>II Plateaux, Rue J15</p>
                            </div>
                          ) : (
                            <Link
                              href={link.href}
                              className="text-gray-700 hover:text-white transition-colors duration-300 text-sm"
                            >
                              {link.title}
                            </Link>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-gray-700 hover:text-white transition-colors duration-300 block py-0.5 w-full text-sm text-left"
                        >
                          {link.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Barre du bas */}
      <div className="border-t border-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0">

            {/* Copyright */}
            <div className="text-gray-700 text-sm ">
              <p>&copy; 2025 Société Ivoirienne de Télédiffusion. </p>
            </div>

            {/* Liens légaux */}
            <div className="flex space-x-4 text-sm">
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