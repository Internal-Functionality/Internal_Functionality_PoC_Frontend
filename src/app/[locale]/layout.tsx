// src/app/[locale]/layout.tsx
import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import React from 'react';

const messagesMap = {
  en: () => import('../../../messages/en.json'),
  es: () => import('../../../messages/es.json'),
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>; // 👈 nota que es async
}) {
  const {locale} = await params; // 👈 así resuelves el warning de params.locale
  const loader = messagesMap[locale as keyof typeof messagesMap];

  if (!loader) notFound();

  const messages = (await loader()).default;

    return (
        <html lang={locale}>
        <body>
            <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
            </NextIntlClientProvider>
        </body>
        </html>
    );
    }
