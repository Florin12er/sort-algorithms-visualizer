// components/LanguageSwitcher.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Select } from "@chakra-ui/react";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    router.push(pathname.replace(`/${locale}`, `/${newLocale}`));
  };

  return (
    <Select value={locale} onChange={handleChange}>
      <option value="en">English</option>
      <option value="de">Deutsch</option>
    </Select>
  );
}
