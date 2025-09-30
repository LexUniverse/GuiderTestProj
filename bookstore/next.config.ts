import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: 'export',
    images: {
        unoptimized: true,
    },
    basePath: '/GuiderTestProj',
};

export default nextConfig;
