import React from 'react';

interface ProductVisualProps {
  imageType: string;
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  imageType,
  name,
  className = '',
  size = 'md',
}) => {
  const containerClasses = `relative flex items-center justify-center overflow-hidden bg-white ${className}`;

  // Dedicated SVG renders with clean white/subtle drop shadows
  const renderGraphic = () => {
    switch (imageType) {
      case 'inverter':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-3 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Solar Inverter Chassis */}
            <rect x="35" y="25" width="130" height="150" rx="8" fill="#1E293B" />
            <rect x="42" y="32" width="116" height="136" rx="4" fill="#0F172A" />
            {/* Top Vent Grille */}
            <line x1="50" y1="42" x2="150" y2="42" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
            <line x1="50" y1="48" x2="150" y2="48" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
            {/* LCD Screen */}
            <rect x="55" y="60" width="90" height="52" rx="4" fill="#0284C7" fillOpacity="0.15" stroke="#38BDF8" strokeWidth="1.5" />
            {/* Inverter Display Data */}
            <text x="62" y="78" fill="#38BDF8" fontSize="10" fontFamily="monospace" fontWeight="bold">PV 36.4V</text>
            <text x="62" y="94" fill="#10B981" fontSize="11" fontFamily="monospace" fontWeight="bold">AC 220V</text>
            <path d="M125 72 L132 82 L128 82 L135 94" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="100" cy="122" r="3" fill="#10B981" />
            <circle cx="112" cy="122" r="3" fill="#F59E0B" />
            <circle cx="88" cy="122" r="3" fill="#EF4444" />
            {/* Brand Logo Plate */}
            <rect x="68" y="136" width="64" height="14" rx="2" fill="#1E3A8A" />
            <text x="100" y="146" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">HYBRID MPPT</text>
            {/* Connection Terminals Bottom */}
            <rect x="52" y="166" width="24" height="8" rx="2" fill="#DC2626" />
            <rect x="82" y="166" width="24" height="8" rx="2" fill="#1E293B" />
            <rect x="112" y="166" width="36" height="8" rx="2" fill="#047857" />
          </svg>
        );

      case 'battery':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-3 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Heavy Duty Lithium Battery Box */}
            <rect x="30" y="55" width="140" height="110" rx="8" fill="#1E293B" />
            <rect x="25" y="45" width="150" height="18" rx="4" fill="#0F172A" />
            {/* Handles */}
            <path d="M45 45 C45 32, 70 32, 70 45" stroke="#475569" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M130 45 C130 32, 155 32, 155 45" stroke="#475569" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Terminals */}
            <rect x="48" y="36" width="16" height="12" rx="2" fill="#DC2626" />
            <text x="56" y="45" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">+</text>
            <rect x="136" y="36" width="16" height="12" rx="2" fill="#2563EB" />
            <text x="144" y="45" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">-</text>
            {/* Front Label & Spec Graphics */}
            <rect x="42" y="75" width="116" height="74" rx="4" fill="#0284C7" fillOpacity="0.1" stroke="#0284C7" strokeWidth="1" />
            <text x="100" y="96" fill="#38BDF8" fontSize="13" fontWeight="bold" textAnchor="middle">LiFePO4 12.8V</text>
            <text x="100" y="114" fill="#F8FAFC" fontSize="16" fontWeight="800" textAnchor="middle">100Ah 1280Wh</text>
            <text x="100" y="132" fill="#10B981" fontSize="9" fontWeight="bold" textAnchor="middle">4000+ CYCLES · SMART BMS</text>
            {/* Battery state indicator */}
            <rect x="52" y="138" width="96" height="4" rx="2" fill="#334155" />
            <rect x="52" y="138" width="80" height="4" rx="2" fill="#10B981" />
          </svg>
        );

      case 'powerstation':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-2 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Portable Power Station Body */}
            <rect x="32" y="50" width="136" height="115" rx="14" fill="#1E293B" />
            {/* Heavy Carry Handle */}
            <path d="M60 50 L60 30 C60 24 140 24 140 30 L140 50" stroke="#F59E0B" strokeWidth="7" strokeLinecap="round" fill="none" />
            {/* Side Bumpers */}
            <rect x="28" y="70" width="8" height="75" rx="3" fill="#F59E0B" />
            <rect x="164" y="70" width="8" height="75" rx="3" fill="#F59E0B" />
            {/* Front Interface */}
            <rect x="44" y="62" width="112" height="92" rx="8" fill="#0F172A" />
            {/* Screen */}
            <rect x="62" y="70" width="76" height="34" rx="4" fill="#0284C7" fillOpacity="0.2" stroke="#38BDF8" strokeWidth="1" />
            <text x="100" y="86" fill="#38BDF8" fontSize="14" fontWeight="bold" textAnchor="middle">98%</text>
            <text x="100" y="98" fill="#10B981" fontSize="8" textAnchor="middle">OUT: 124W · 500W MAX</text>
            {/* AC Outlets */}
            <circle cx="64" cy="126" r="11" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
            <circle cx="61" cy="124" r="1.5" fill="#F8FAFC" />
            <circle cx="67" cy="124" r="1.5" fill="#F8FAFC" />
            <circle cx="64" cy="130" r="1.5" fill="#F8FAFC" />
            {/* USB-C and USB Ports */}
            <rect x="94" y="118" width="18" height="6" rx="2" fill="#2563EB" />
            <rect x="94" y="128" width="18" height="6" rx="2" fill="#2563EB" />
            {/* LED Torch */}
            <rect x="126" y="118" width="18" height="18" rx="4" fill="#FEF08A" stroke="#F59E0B" strokeWidth="1.5" />
          </svg>
        );

      case 'solarpanel':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-2 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Monocrystalline Solar Panel Frame */}
            <rect x="40" y="24" width="120" height="152" rx="4" fill="#94A3B8" stroke="#64748B" strokeWidth="3" />
            <rect x="45" y="29" width="110" height="142" fill="#0F172A" />
            {/* Photovoltaic Cell Grid */}
            <line x1="45" y1="52" x2="155" y2="52" stroke="#38BDF8" strokeWidth="0.8" strokeOpacity="0.7" />
            <line x1="45" y1="76" x2="155" y2="76" stroke="#38BDF8" strokeWidth="0.8" strokeOpacity="0.7" />
            <line x1="45" y1="100" x2="155" y2="100" stroke="#38BDF8" strokeWidth="0.8" strokeOpacity="0.7" />
            <line x1="45" y1="124" x2="155" y2="124" stroke="#38BDF8" strokeWidth="0.8" strokeOpacity="0.7" />
            <line x1="45" y1="148" x2="155" y2="148" stroke="#38BDF8" strokeWidth="0.8" strokeOpacity="0.7" />
            {/* Vertical busbars */}
            <line x1="72" y1="29" x2="72" y2="171" stroke="#F8FAFC" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="100" y1="29" x2="100" y2="171" stroke="#F8FAFC" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="128" y1="29" x2="128" y2="171" stroke="#F8FAFC" strokeWidth="1" strokeOpacity="0.4" />
            {/* Sun glare reflection diagonal */}
            <path d="M45 40 L130 171 L110 171 L45 70 Z" fill="#FFFFFF" fillOpacity="0.12" />
            {/* Corner Solar Badge */}
            <circle cx="140" cy="42" r="12" fill="#F59E0B" fillOpacity="0.9" />
            <text x="140" y="45" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">200W</text>
          </svg>
        );

      case 'controller':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-3 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="42" y="35" width="116" height="130" rx="8" fill="#1E3A8A" />
            <rect x="52" y="48" width="96" height="52" rx="4" fill="#0F172A" />
            <rect x="58" y="54" width="84" height="40" rx="2" fill="#065F46" fillOpacity="0.2" stroke="#10B981" strokeWidth="1" />
            <text x="100" y="74" fill="#34D399" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">14.4V  30A</text>
            <text x="100" y="87" fill="#6EE7B7" fontSize="8" textAnchor="middle">MPPT AUTO 12/24V</text>
            {/* Push Buttons */}
            <circle cx="75" cy="116" r="6" fill="#3B82F6" />
            <circle cx="100" cy="116" r="6" fill="#3B82F6" />
            <circle cx="125" cy="116" r="6" fill="#3B82F6" />
            {/* Dual USB */}
            <rect x="76" y="132" width="18" height="6" rx="1.5" fill="#F8FAFC" />
            <rect x="106" y="132" width="18" height="6" rx="1.5" fill="#F8FAFC" />
            {/* Terminal blocks */}
            <rect x="54" y="152" width="92" height="10" rx="2" fill="#0F172A" />
            <circle cx="64" cy="157" r="2.5" fill="#DC2626" />
            <circle cx="78" cy="157" r="2.5" fill="#2563EB" />
            <circle cx="92" cy="157" r="2.5" fill="#F59E0B" />
            <circle cx="108" cy="157" r="2.5" fill="#10B981" />
            <circle cx="122" cy="157" r="2.5" fill="#64748B" />
          </svg>
        );

      case 'solarkit':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-2 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Solar Home Lighting Kit: Mini Panel + Central Battery + 2 LED bulbs */}
            <rect x="25" y="32" width="75" height="95" rx="3" fill="#1E293B" stroke="#94A3B8" strokeWidth="2" />
            <line x1="25" y1="64" x2="100" y2="64" stroke="#38BDF8" strokeWidth="1" />
            <line x1="25" y1="95" x2="100" y2="95" stroke="#38BDF8" strokeWidth="1" />
            <line x1="62" y1="32" x2="62" y2="127" stroke="#38BDF8" strokeWidth="1" />
            {/* Main Battery Box */}
            <rect x="108" y="65" width="68" height="62" rx="6" fill="#2563EB" />
            <rect x="114" y="74" width="56" height="24" rx="3" fill="#0F172A" />
            <text x="142" y="90" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle">300W DC</text>
            <circle cx="126" cy="112" r="3" fill="#22C55E" />
            <circle cx="142" cy="112" r="3" fill="#F59E0B" />
            <circle cx="158" cy="112" r="3" fill="#EF4444" />
            {/* Hanging LED Bulb 1 */}
            <path d="M60 145 C50 145 45 155 45 165 C45 175 52 182 60 182 C68 182 75 175 75 165 C75 155 70 145 60 145 Z" fill="#FDE047" stroke="#EAB308" strokeWidth="2" />
            <rect x="54" y="140" width="12" height="6" fill="#94A3B8" />
            {/* Hanging LED Bulb 2 */}
            <path d="M140 145 C130 145 125 155 125 165 C125 175 132 182 140 182 C148 182 155 175 155 165 C155 155 150 145 140 145 Z" fill="#FDE047" stroke="#EAB308" strokeWidth="2" />
            <rect x="134" y="140" width="12" height="6" fill="#94A3B8" />
          </svg>
        );

      case 'mic':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-3 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* BOYA Lavalier Mic capsule & Power Pack */}
            <rect x="68" y="75" width="28" height="58" rx="6" fill="#1E293B" stroke="#475569" strokeWidth="1" />
            <rect x="74" y="82" width="16" height="6" rx="2" fill="#DC2626" />
            <text x="82" y="104" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle">BOYA</text>
            <text x="82" y="116" fill="#94A3B8" fontSize="5" textAnchor="middle">-10dB</text>
            <circle cx="82" cy="125" r="2" fill="#10B981" />
            {/* Cable coiled */}
            <path d="M82 75 C82 50, 110 50, 120 70 C130 90, 140 70, 140 45" stroke="#334155" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            {/* Mic Capsule & Foam Windscreen */}
            <circle cx="140" cy="38" r="14" fill="#18181B" stroke="#27272A" strokeWidth="2" />
            <rect x="137" y="52" width="6" height="8" rx="2" fill="#71717A" />
            {/* Lapel Clip */}
            <path d="M128 42 L120 48" stroke="#52525B" strokeWidth="3" strokeLinecap="round" />
            {/* Gold Plated 3.5mm TRRS Jack */}
            <path d="M82 133 C82 165, 110 165, 130 160" stroke="#334155" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <rect x="130" y="156" width="24" height="7" rx="3" fill="#1E293B" />
            <rect x="154" y="157" width="16" height="5" fill="#EAB308" />
            <line x1="158" y1="157" x2="158" y2="162" stroke="#000000" strokeWidth="1" />
            <line x1="163" y1="157" x2="163" y2="162" stroke="#000000" strokeWidth="1" />
          </svg>
        );

      case 'studiomic':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-2 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Boom Arm articulated */}
            <path d="M30 170 L55 120 L75 80" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
            <circle cx="55" cy="120" r="5" fill="#64748B" />
            {/* Shockmount spider circle */}
            <circle cx="110" cy="85" r="36" stroke="#475569" strokeWidth="3" fill="none" />
            <line x1="85" y1="70" x2="135" y2="100" stroke="#EF4444" strokeWidth="1.5" />
            <line x1="85" y1="100" x2="135" y2="70" stroke="#EF4444" strokeWidth="1.5" />
            {/* Studio Condenser Mic Body */}
            <rect x="94" y="45" width="32" height="80" rx="8" fill="#0F172A" />
            {/* Metal Mesh Grille Top */}
            <rect x="96" y="47" width="28" height="38" rx="6" fill="#1E293B" stroke="#64748B" strokeWidth="1" />
            <line x1="96" y1="56" x2="124" y2="56" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="96" y1="66" x2="124" y2="66" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="96" y1="76" x2="124" y2="76" stroke="#94A3B8" strokeWidth="0.8" />
            {/* One-touch Mute Sensor LED */}
            <circle cx="110" cy="94" r="4" fill="#22C55E" />
            {/* Headphone Volume knob */}
            <circle cx="110" cy="110" r="3.5" fill="#64748B" />
            {/* Pop Filter Circular Mesh */}
            <circle cx="150" cy="70" r="24" stroke="#18181B" strokeWidth="4" fill="#000000" fillOpacity="0.2" />
            <path d="M125 105 C145 110, 150 90, 150 70" stroke="#71717A" strokeWidth="3" fill="none" />
          </svg>
        );

      case 'ringlight':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-2 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 18-inch RGB Ring Light */}
            <circle cx="100" cy="80" r="58" stroke="#1E293B" strokeWidth="20" fill="none" />
            {/* Diffused Glowing Ring */}
            <circle cx="100" cy="80" r="58" stroke="#38BDF8" strokeWidth="12" strokeDasharray="30 8" fill="none" opacity="0.9" />
            <circle cx="100" cy="80" r="58" stroke="#EC4899" strokeWidth="12" strokeDasharray="18 20" fill="none" opacity="0.8" />
            {/* Center Phone Holder with smartphone mounted */}
            <rect x="88" y="60" width="24" height="42" rx="4" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
            <rect x="91" y="65" width="18" height="30" rx="2" fill="#3B82F6" fillOpacity="0.3" />
            <circle cx="100" cy="72" r="2.5" fill="#F43F5E" />
            {/* Gooseneck Flexible Arm */}
            <path d="M100 102 L100 128" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
            {/* Heavy-Duty Metal Tripod Stand */}
            <rect x="96" y="128" width="8" height="24" fill="#1E293B" />
            <line x1="96" y1="152" x2="60" y2="185" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
            <line x1="104" y1="152" x2="140" y2="185" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
            <line x1="100" y1="152" x2="100" y2="188" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
          </svg>
        );

      case 'gimbal':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-2 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Zhiyun 3-Axis Stabilizer Handle */}
            <rect x="88" y="105" width="24" height="70" rx="8" fill="#1E293B" />
            <rect x="91" y="112" width="18" height="36" rx="4" fill="#0F172A" />
            {/* Joystick and control dial */}
            <circle cx="100" cy="122" r="5" fill="#475569" />
            <circle cx="100" cy="138" r="4" fill="#DC2626" />
            {/* Ergonomic Grip Texture */}
            <line x1="92" y1="154" x2="108" y2="154" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
            <line x1="92" y1="160" x2="108" y2="160" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
            <line x1="92" y1="166" x2="108" y2="166" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
            {/* Pan & Tilt Axis Arms */}
            <path d="M100 105 L100 85 L135 85 L135 55" stroke="#475569" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="100" cy="92" r="6" fill="#F59E0B" />
            <circle cx="135" cy="70" r="6" fill="#F59E0B" />
            {/* Smartphone Clamp with phone */}
            <rect x="52" y="32" width="76" height="42" rx="6" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
            <rect x="56" y="36" width="68" height="34" rx="3" fill="#1E40AF" fillOpacity="0.3" />
            {/* Magnetic Fill Light */}
            <rect x="130" y="32" width="14" height="20" rx="3" fill="#FEF08A" stroke="#EAB308" strokeWidth="1.5" />
          </svg>
        );

      case 'capturecard':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-3 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Aluminum Capture Card Dongle */}
            <rect x="55" y="70" width="85" height="55" rx="6" fill="#334155" stroke="#475569" strokeWidth="1.5" />
            <rect x="58" y="73" width="79" height="49" rx="4" fill="#1E293B" />
            <text x="97" y="96" fill="#F8FAFC" fontSize="11" fontWeight="bold" textAnchor="middle">4K CAM LINK</text>
            <text x="97" y="108" fill="#38BDF8" fontSize="8" fontWeight="bold" textAnchor="middle">1080P 60FPS OBS</text>
            <circle cx="70" cy="84" r="2.5" fill="#10B981" />
            {/* HDMI Port */}
            <rect x="35" y="85" width="20" height="25" rx="2" fill="#0F172A" stroke="#64748B" strokeWidth="1" />
            <polygon points="40,92 50,92 48,103 42,103" fill="#EAB308" />
            {/* USB 3.0 connector */}
            <rect x="140" y="87" width="22" height="20" rx="2" fill="#94A3B8" />
            <rect x="145" y="91" width="14" height="12" fill="#2563EB" />
          </svg>
        );

      case 'headphones':
      case 'q30headphones':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-2 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Headband arch */}
            <path d="M45 110 C45 45, 155 45, 155 110" stroke="#1E293B" strokeWidth="10" strokeLinecap="round" fill="none" />
            <path d="M60 90 C60 55, 140 55, 140 90" stroke="#334155" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Left Ear Cup */}
            <rect x="30" y="95" width="30" height="55" rx="15" fill="#0F172A" stroke="#475569" strokeWidth="2" />
            <rect x="25" y="100" width="12" height="45" rx="6" fill="#334155" />
            {/* Right Ear Cup */}
            <rect x="140" y="95" width="30" height="55" rx="15" fill="#0F172A" stroke="#475569" strokeWidth="2" />
            <rect x="163" y="100" width="12" height="45" rx="6" fill="#334155" />
            {/* Brand Accent ring */}
            <circle cx="45" cy="122" r="8" stroke="#D97706" strokeWidth="1.5" fill="none" />
            <circle cx="155" cy="122" r="8" stroke="#D97706" strokeWidth="1.5" fill="none" />
            <text x="100" y="152" fill="#2563EB" fontSize="10" fontWeight="bold" textAnchor="middle">ANC HI-RES</text>
          </svg>
        );

      case 'earbuds':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-2 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Charging Case Pill */}
            <rect x="45" y="80" width="110" height="75" rx="28" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2.5" />
            <line x1="45" y1="108" x2="155" y2="108" stroke="#E2E8F0" strokeWidth="2" />
            {/* LED indicator */}
            <circle cx="100" cy="124" r="3" fill="#10B981" />
            {/* Left Stem Earbud */}
            <ellipse cx="65" cy="55" rx="15" ry="12" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
            <rect x="68" y="55" width="7" height="30" rx="3.5" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1" />
            <circle cx="62" cy="54" r="5" fill="#475569" />
            {/* Right Stem Earbud */}
            <ellipse cx="135" cy="55" rx="15" ry="12" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
            <rect x="125" y="55" width="7" height="30" rx="3.5" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1" />
            <circle cx="138" cy="54" r="5" fill="#475569" />
          </svg>
        );

      case 'speakers':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-2 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Bookshelf wooden finish speakers (pair) */}
            {/* Left Speaker */}
            <rect x="35" y="45" width="55" height="110" rx="4" fill="#78350F" stroke="#451A03" strokeWidth="2" />
            <rect x="42" y="52" width="41" height="96" rx="2" fill="#1E293B" />
            <circle cx="62" cy="74" r="11" fill="#0F172A" stroke="#94A3B8" strokeWidth="1.5" />
            <circle cx="62" cy="115" r="18" fill="#0F172A" stroke="#CBD5E1" strokeWidth="2" />
            <circle cx="62" cy="115" r="8" fill="#D97706" />
            {/* Right Speaker with Control Dials */}
            <rect x="105" y="45" width="55" height="110" rx="4" fill="#78350F" stroke="#451A03" strokeWidth="2" />
            <rect x="112" y="52" width="41" height="96" rx="2" fill="#1E293B" />
            <circle cx="132" cy="74" r="11" fill="#0F172A" stroke="#94A3B8" strokeWidth="1.5" />
            <circle cx="132" cy="115" r="18" fill="#0F172A" stroke="#CBD5E1" strokeWidth="2" />
            <circle cx="132" cy="115" r="8" fill="#D97706" />
            {/* Side Volume Knob */}
            <rect x="160" y="80" width="5" height="10" rx="2" fill="#94A3B8" />
          </svg>
        );

      case 'smartband':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-2 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Silicone Strap */}
            <rect x="86" y="20" width="28" height="160" rx="14" fill="#334155" />
            {/* Band Capsule */}
            <rect x="80" y="50" width="40" height="95" rx="12" fill="#0F172A" stroke="#475569" strokeWidth="2" />
            {/* AMOLED Bezel & Screen */}
            <rect x="84" y="55" width="32" height="85" rx="8" fill="#000000" />
            <text x="100" y="82" fill="#FFFFFF" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">10:45</text>
            <text x="100" y="98" fill="#38BDF8" fontSize="8" fontWeight="bold" textAnchor="middle">8,420 steps</text>
            <text x="100" y="112" fill="#EF4444" fontSize="8" fontWeight="bold" textAnchor="middle">♥ 76 bpm</text>
            <circle cx="100" cy="126" r="3" fill="#10B981" />
          </svg>
        );

      case 'smartwatch':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-2 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Leather / Fluoroelastomer Strap */}
            <rect x="82" y="18" width="36" height="164" rx="8" fill="#475569" />
            {/* Circular Metal Bezel */}
            <circle cx="100" cy="100" r="48" fill="#1E293B" stroke="#64748B" strokeWidth="3" />
            {/* AMOLED Watch Face */}
            <circle cx="100" cy="100" r="42" fill="#09090B" />
            {/* Chronograph dial accents */}
            <circle cx="100" cy="100" r="34" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" fill="none" />
            <text x="100" y="94" fill="#FFFFFF" fontSize="16" fontWeight="800" textAnchor="middle">12:30</text>
            <text x="100" y="108" fill="#F59E0B" fontSize="9" fontWeight="bold" textAnchor="middle">GPS DUAL</text>
            <path d="M100 100 L115 110" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
            <circle cx="100" cy="100" r="3" fill="#EF4444" />
            {/* Crown button */}
            <rect x="148" y="92" width="6" height="16" rx="2" fill="#94A3B8" />
          </svg>
        );

      case 'charger':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-3 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* GaN Charger Body */}
            <rect x="62" y="45" width="76" height="95" rx="10" fill="#18181B" stroke="#27272A" strokeWidth="2" />
            <text x="100" y="72" fill="#F8FAFC" fontSize="14" fontWeight="800" textAnchor="middle">65W</text>
            <text x="100" y="85" fill="#3B82F6" fontSize="8" fontWeight="bold" textAnchor="middle">GaN5 Pro</text>
            {/* Ports */}
            <rect x="91" y="96" width="18" height="6" rx="2" fill="#3B82F6" />
            <rect x="91" y="106" width="18" height="6" rx="2" fill="#3B82F6" />
            <rect x="90" y="118" width="20" height="7" rx="1.5" fill="#F59E0B" />
            {/* AC Prongs (EU/UK style) */}
            <rect x="78" y="140" width="8" height="24" rx="2" fill="#94A3B8" />
            <rect x="114" y="140" width="8" height="24" rx="2" fill="#94A3B8" />
          </svg>
        );

      case 'powerbank':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-2 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="58" y="32" width="84" height="136" rx="12" fill="#0F172A" stroke="#334155" strokeWidth="2" />
            <rect x="74" y="45" width="52" height="30" rx="6" fill="#0284C7" fillOpacity="0.2" stroke="#0284C7" strokeWidth="1" />
            <text x="100" y="65" fill="#38BDF8" fontSize="15" fontWeight="bold" textAnchor="middle" fontFamily="monospace">100%</text>
            <text x="100" y="105" fill="#F8FAFC" fontSize="11" fontWeight="bold" textAnchor="middle">30000mAh</text>
            <text x="100" y="120" fill="#10B981" fontSize="9" fontWeight="bold" textAnchor="middle">22.5W SUPER FAST</text>
            {/* Top USB Outputs */}
            <rect x="68" y="24" width="14" height="8" rx="2" fill="#2563EB" />
            <rect x="93" y="24" width="14" height="8" rx="2" fill="#0284C7" />
            <rect x="118" y="24" width="14" height="8" rx="2" fill="#2563EB" />
          </svg>
        );

      case 'mouse':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-2 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Logitech MX Master 3S Sculpted Body */}
            <path d="M60 145 C50 115 55 75 80 50 C95 35 125 35 135 60 C145 85 145 135 125 155 C105 170 70 165 60 145 Z" fill="#1E293B" stroke="#334155" strokeWidth="2" />
            {/* Thumb Rest Wing */}
            <path d="M60 115 C45 120 40 145 60 155 Z" fill="#0F172A" />
            {/* MagSpeed Metal Scroll Wheel */}
            <rect x="95" y="45" width="10" height="24" rx="4" fill="#94A3B8" stroke="#CBD5E1" strokeWidth="1" />
            <line x1="95" y1="52" x2="105" y2="52" stroke="#334155" strokeWidth="1" />
            <line x1="95" y1="58" x2="105" y2="58" stroke="#334155" strokeWidth="1" />
            <line x1="95" y1="64" x2="105" y2="64" stroke="#334155" strokeWidth="1" />
            {/* Thumb Wheel */}
            <rect x="52" y="112" width="8" height="18" rx="3" fill="#94A3B8" />
            {/* Click Separator */}
            <line x1="100" y1="36" x2="100" y2="85" stroke="#0F172A" strokeWidth="2" />
          </svg>
        );

      case 'keyboard':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-2 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 75% Mechanical Keyboard Chassis */}
            <rect x="25" y="55" width="150" height="90" rx="8" fill="#1E293B" stroke="#334155" strokeWidth="2" />
            {/* Keycap Matrix with RGB Illumination accents */}
            <g fill="#0F172A" stroke="#3B82F6" strokeWidth="0.8">
              {/* Row 1 */}
              <rect x="32" y="62" width="10" height="12" rx="2" />
              <rect x="45" y="62" width="10" height="12" rx="2" />
              <rect x="58" y="62" width="10" height="12" rx="2" />
              <rect x="71" y="62" width="10" height="12" rx="2" />
              <rect x="84" y="62" width="10" height="12" rx="2" />
              <rect x="97" y="62" width="10" height="12" rx="2" />
              <rect x="110" y="62" width="10" height="12" rx="2" />
              <rect x="123" y="62" width="10" height="12" rx="2" />
              <rect x="136" y="62" width="10" height="12" rx="2" />
              <rect x="149" y="62" width="18" height="12" rx="2" fill="#DC2626" />

              {/* Row 2 */}
              <rect x="32" y="78" width="14" height="12" rx="2" />
              <rect x="49" y="78" width="10" height="12" rx="2" />
              <rect x="62" y="78" width="10" height="12" rx="2" />
              <rect x="75" y="78" width="10" height="12" rx="2" />
              <rect x="88" y="78" width="10" height="12" rx="2" />
              <rect x="101" y="78" width="10" height="12" rx="2" />
              <rect x="114" y="78" width="10" height="12" rx="2" />
              <rect x="127" y="78" width="10" height="12" rx="2" />
              <rect x="140" y="78" width="10" height="12" rx="2" />
              <rect x="153" y="78" width="14" height="12" rx="2" />

              {/* Spacebar Row */}
              <rect x="32" y="126" width="14" height="12" rx="2" />
              <rect x="49" y="126" width="14" height="12" rx="2" />
              <rect x="66" y="126" width="60" height="12" rx="2" stroke="#EC4899" />
              <rect x="129" y="126" width="10" height="12" rx="2" />
              <rect x="142" y="126" width="10" height="12" rx="2" />
              <rect x="155" y="126" width="12" height="12" rx="2" />
            </g>
          </svg>
        );

      case 'router':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-2 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 4 High Gain Antennas */}
            <line x1="35" y1="120" x2="25" y2="40" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
            <line x1="75" y1="115" x2="68" y2="35" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
            <line x1="125" y1="115" x2="132" y2="35" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
            <line x1="165" y1="120" x2="175" y2="40" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
            {/* Router Body */}
            <polygon points="35,145 60,115 140,115 165,145 155,160 45,160" fill="#0F172A" stroke="#334155" strokeWidth="2" />
            {/* X-Pattern Heat Vents */}
            <line x1="70" y1="124" x2="130" y2="148" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.8" />
            <line x1="130" y1="124" x2="70" y2="148" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.8" />
            {/* Status LEDs */}
            <circle cx="85" cy="154" r="2" fill="#10B981" />
            <circle cx="95" cy="154" r="2" fill="#10B981" />
            <circle cx="105" cy="154" r="2" fill="#10B981" />
            <circle cx="115" cy="154" r="2" fill="#38BDF8" />
          </svg>
        );

      case 'usbhub':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-3 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Space Gray Aluminum Hub Body */}
            <rect x="65" y="40" width="70" height="120" rx="10" fill="#475569" stroke="#64748B" strokeWidth="2" />
            {/* Braided Cable Lead */}
            <path d="M100 40 L100 15" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
            <rect x="94" y="8" width="12" height="12" rx="3" fill="#94A3B8" />
            {/* USB 3.0 Ports */}
            <rect x="74" y="60" width="22" height="7" rx="2" fill="#0F172A" />
            <rect x="76" y="61" width="18" height="3" fill="#2563EB" />
            <rect x="74" y="74" width="22" height="7" rx="2" fill="#0F172A" />
            <rect x="76" y="75" width="18" height="3" fill="#2563EB" />
            <rect x="74" y="88" width="22" height="7" rx="2" fill="#0F172A" />
            <rect x="76" y="89" width="18" height="3" fill="#2563EB" />
            {/* SD & MicroSD slot */}
            <rect x="74" y="105" width="26" height="4" rx="1" fill="#0F172A" />
            <rect x="74" y="115" width="18" height="3" rx="1" fill="#0F172A" />
            {/* 100W PD Type-C */}
            <rect x="76" y="130" width="16" height="5" rx="2.5" fill="#38BDF8" />
            <text x="100" y="150" fill="#F8FAFC" fontSize="8" fontWeight="bold" textAnchor="middle">4K HDMI · 100W PD</text>
          </svg>
        );

      default:
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-50 text-slate-700">
            <div className="w-16 h-16 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold mb-2">
              KB
            </div>
            <p className="text-xs font-semibold text-center line-clamp-1">{name}</p>
          </div>
        );
    }
  };

  return (
    <div className={containerClasses} title={name}>
      {renderGraphic()}
    </div>
  );
};
