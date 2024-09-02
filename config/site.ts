import { SiteConfig } from "types";
import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "BAF Bienes Raices",
  description:
    "Descubra el hogar de sus sueños con nosotros. Nuestra pasión es encontrar la propiedad perfecta que se adapte a sus necesidades y estilo de vida.",
  url: site_url,
  links: {
    twitter: "https://x.com/liambialy",
    github: "https://github.com/bialyLT",
    facebook: "https://www.facebook.com/profile.php?id=100077386128848",
    linkedin: "https://www.linkedin.com/in/liambialy"
  },
  mailSupport: "bafbienesraices@gmail.com",
};
