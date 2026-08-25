(() => {
  'use strict';

  // Microsoft Clarity
  window.clarity = window.clarity || function () {
    (window.clarity.q = window.clarity.q || []).push(arguments);
  };
  const clarityScript = document.createElement('script');
  clarityScript.async = true;
  clarityScript.src = 'https://www.clarity.ms/tag/y7isd6vxdf';
  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(clarityScript, firstScript);

  // Google Analytics 4
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', 'G-GRNVQK2Z5Y', {
    anonymize_ip: true,
    allow_google_signals: false
  });
})();
