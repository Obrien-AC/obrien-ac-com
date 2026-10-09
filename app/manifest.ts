import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';
export default function manifest():MetadataRoute.Manifest { return { name:'O’Brien Air Conditioning', short_name:'O’Brien AC', description:'Commercial and residential air conditioning service in South Florida.', start_url:'/', display:'standalone', background_color:'#030604', theme_color:'#15995d', icons:[{src:'/icon.png',sizes:'512x512',type:'image/png'}] }; }
