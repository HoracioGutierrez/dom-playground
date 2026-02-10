"use client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

function LanguageSwitcher() {
    const t = useTranslations("LanguageSwitcher");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleChange = (language: string) => {
        router.replace(pathname, { locale: language });
    }

    return (
        <Select value={locale} onValueChange={handleChange}>
            <SelectTrigger className="xl:w-[180px]">
                <SelectValue placeholder={t("en")} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel className='hidden xl:block'>{t("label")}</SelectLabel>
                    <SelectItem value="en">
                        <span className='hidden xl:inline'>{t("en")}</span>
                        <span className='xl:hidden'>EN</span>
                    </SelectItem>
                    <SelectItem value="es">
                        <span className='hidden xl:inline'>{t("es")}</span>
                        <span className='xl:hidden'>ES</span>
                    </SelectItem>
                    <SelectItem value="pt">
                        <span className='hidden xl:inline'>{t("pt")}</span>
                        <span className='xl:hidden'>PT</span>
                    </SelectItem>
                    <SelectItem value="ru">
                        <span className='hidden xl:inline'>{t("ru")}</span>
                        <span className='xl:hidden'>RU</span>
                    </SelectItem>
                    <SelectItem value="de">
                        <span className='hidden xl:inline'>{t("de")}</span>
                        <span className='xl:hidden'>DE</span>
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
export default LanguageSwitcher
