export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalPage = {
  kind: "Privacy policy" | "Terms & conditions";
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
};

export const privacyPolicy: LegalPage = {
  kind: "Privacy policy",
  title: "Your information, handled with care.",
  description:
    "This policy explains what Meridian Dispatch Group collects, why we collect it, and the choices you have when you use our website or contact our team.",
  updated: "October 26, 2026",
  sections: [
    {
      id: "information-we-collect",
      title: "Information we collect",
      paragraphs: [
        "We collect information you choose to provide when you request a consultation, submit a career application, join our newsletter, or contact the dispatch desk. This may include your name, email address, phone number, company details, equipment information, message content, and résumé.",
        "We also receive limited technical information, such as browser type, device information, and pages visited, to keep the website secure and improve its performance.",
      ],
    },
    {
      id: "how-we-use-information",
      title: "How we use information",
      paragraphs: [
        "Meridian uses submitted information to respond to requests, evaluate applications, provide dispatching services, communicate about an active relationship, and maintain accurate business records.",
      ],
      bullets: [
        "We do not sell personal information.",
        "We use information only for legitimate business and service purposes.",
        "We limit access to people who need it to perform their role.",
      ],
    },
    {
      id: "sharing-and-retention",
      title: "Sharing and retention",
      paragraphs: [
        "We may share information with trusted service providers that help us operate the website, manage communications, or process business records. Those providers may use the information only to perform services for us.",
        "We retain information for as long as reasonably necessary for the purpose it was collected, to meet legal obligations, resolve disputes, and enforce our agreements.",
      ],
    },
    {
      id: "your-choices",
      title: "Your choices",
      paragraphs: [
        "You can ask us to update or delete information you have provided, or unsubscribe from marketing messages at any time. Some business records may need to be retained where required by law or for legitimate operational purposes.",
      ],
    },
    {
      id: "contact",
      title: "Questions about privacy",
      paragraphs: [
        "For privacy questions or requests, email careers@meridiandispatch.com or write to Meridian Dispatch Group LLC, 4100 Alpha Rd, Suite 520, Dallas, TX 75244.",
      ],
    },
  ],
};

export const termsAndConditions: LegalPage = {
  kind: "Terms & conditions",
  title: "Clear terms for a better working relationship.",
  description:
    "These terms govern your use of the Meridian Dispatch Group website. Service-specific agreements and written carrier arrangements control any dispatching engagement.",
  updated: "October 26, 2026",
  sections: [
    {
      id: "using-this-site",
      title: "Using this website",
      paragraphs: [
        "You may use this website for lawful business, informational, and recruiting purposes. You agree not to interfere with the website, attempt unauthorized access, submit misleading information, or use automated methods to copy or disrupt its content.",
      ],
    },
    {
      id: "information-on-the-site",
      title: "Information on the site",
      paragraphs: [
        "We work to keep the information on this website accurate and current, but service descriptions, availability, market observations, and blog content are provided for general information. They are not a guarantee of rates, capacity, revenue, compliance outcomes, or business results.",
      ],
    },
    {
      id: "dispatch-services",
      title: "Dispatch services",
      paragraphs: [
        "A website inquiry or application does not create a client, carrier, employment, agency, brokerage, or other business relationship. Any dispatching service is subject to a separate written agreement that describes scope, responsibilities, fees, and applicable requirements.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Our content",
      paragraphs: [
        "The Meridian name, visual identity, website design, copy, graphics, and original materials belong to Meridian Dispatch Group LLC or its licensors. You may not reproduce, modify, distribute, or commercially exploit them without written permission.",
      ],
    },
    {
      id: "disclaimers-and-liability",
      title: "Disclaimers and liability",
      paragraphs: [
        "The website is provided on an as-available basis. To the fullest extent allowed by law, Meridian disclaims warranties not expressly included in a written service agreement and is not responsible for indirect, incidental, or consequential losses arising from website use.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [
        "Questions about these terms can be sent to dispatch@meridiandispatch.com. We may update these terms as our website and services evolve; the updated date above indicates the latest revision.",
      ],
    },
  ],
};
