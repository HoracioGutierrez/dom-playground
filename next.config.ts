import type { NextConfig } from "next";
import { withGTConfig } from 'gt-next/config';


const nextConfig: NextConfig = {
};

export default withGTConfig(nextConfig, {
  locales: ['pt', 'es', 'en', 'de', 'ru']
});