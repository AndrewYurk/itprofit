import '../styles/main.scss'
import { initModal } from './modules/modal.js'
import { initTabs } from './modules/tabs.js'
import { initFeedbackForm } from "./modules/feedbackForm.js"
import { initAccordion } from "./modules/accordion.js"
import headerHtml from '../components/header.html'
import footerHtml from '../components/footer.html'
import heroHtml from '../components/sections/hero.html'
import contactHtml from '../components/sections/contact.html'
import aboutHtml from '../components/sections/about.html'
import featuresHtml from '../components/sections/features.html'
import features2Html from '../components/sections/features-2.html'
import featuresCardsHtml from '../components/sections/features-cards.html'
import pricingHtml from '../components/sections/pricing.html'
import faqHtml from '../components/sections/faq.html'

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('header').innerHTML = headerHtml
  document.getElementById('footer').innerHTML = footerHtml
  document.getElementById('home').innerHTML = heroHtml
  document.getElementById('contact').innerHTML = contactHtml
  document.getElementById('about').innerHTML = aboutHtml
  document.getElementById('features').innerHTML = featuresHtml
  document.getElementById('features-2').innerHTML = features2Html
  document.getElementById('features-cards').innerHTML = featuresCardsHtml
  document.getElementById('pricing').innerHTML = pricingHtml
  document.getElementById('faq').innerHTML = faqHtml
  
  document.querySelector('#new-msg').addEventListener('click', () => {
    document.querySelector('.contact-success').classList.remove('show')
  });
  
  initModal();
  initTabs();
  initFeedbackForm();
  initAccordion();
});
