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
            <SelectTrigger className="xl:w-[180px]">
                <SelectValue placeholder={"English"} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel className='hidden xl:block'>Languages</SelectLabel>
                    <SelectItem value="en">
                        <span className='hidden xl:inline'>English</span>
                        <span className='xl:hidden'>EN</span>
                        
                    </SelectItem>
                    <SelectItem value="es">
                        <span className='hidden xl:inline'>Spanish</span>
                        <span className='xl:hidden'>ES</span>
                        
                    </SelectItem>
                    <SelectItem value="pt">
                        <span className='hidden xl:inline'>Portuguese</span>
                        <span className='xl:hidden'>PT</span>
                        
                    </SelectItem>
                    <SelectItem value="ru">
                        <span className='hidden xl:inline'>Russian</span>
                        <span className='xl:hidden'>RU</span>
                        
                    </SelectItem>
                    <SelectItem value="de">
                        <span className='hidden xl:inline'>German</span>
                        <span className='xl:hidden'>DE</span>
                        
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
export default LanguageSwitcher