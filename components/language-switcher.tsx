"use client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useLocale, useSetLocale } from 'gt-next/client';

function LanguageSwitcher() {

    const locale = useLocale()
    const setLocale = useSetLocale()


    const handleChange = (language: string) => {
        setLocale(language)
    }

    return (
        <Select value={locale} onValueChange={handleChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={"English"} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Languages</SelectLabel>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="pt">Portuguese</SelectItem>
                    <SelectItem value="ru">Russian</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
export default LanguageSwitcher