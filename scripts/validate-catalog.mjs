import fs from "node:fs";
const load=(name)=>fs.readFileSync(new URL("../"+name,import.meta.url),"utf8");
const templates=load("lib/service-templates.ts");
const specs=load("lib/service-specs.ts");
const rich=load("lib/service-content.ts")+load("lib/service-content-exhibitions.ts")+load("lib/service-content-specialty.ts")+load("lib/service-content-creative.ts");
const routing=load("lib/catalog-routing.ts");
const keys=Array.from(templates.matchAll(/\["([^"]+)","/g),m=>m[1]);
const duplicate=keys.filter((key,index)=>keys.indexOf(key)!==index);
const missingSpecs=keys.filter(key=>!specs.includes(key));
const missingContent=keys.filter(key=>!rich.includes(key));
const missingRouting=keys.filter(key=>!routing.includes(key));
const weakSpecs=keys.filter(key=>{
 const start=specs.indexOf(`"${key}": [`);
 if(start<0)return false;
 const end=specs.indexOf("\n  ],",start);
 const block=specs.slice(start,end<0?start+5000:end);
 const hasGroup=block.includes('group:');
 const hasRfqDriver=block.includes('quoteQty(')||block.includes('type: "number"')||block.includes('key: "scope"')||block.includes('key:"scope"')||block.includes('key: "service"')||block.includes('key: "deliverables"')||block.includes('key:"deliverables"')||block.includes('key: "coverage"')||block.includes('key: "job"')||block.includes('key: "production"')||block.includes('key: "execution"')||block.includes('key: "install"')||block.includes('key: "installation"')||block.includes('key: "delivery"')||block.includes('key:"delivery"');
 return !hasGroup||!hasRfqDriver;
});
const invalidPricing=/\b(price|price_cents|unit_price|fixed_price)\b\s*[:=]/i.test(templates+specs+rich);
if(duplicate.length||missingSpecs.length||missingContent.length||missingRouting.length||weakSpecs.length||invalidPricing){
 console.error("Catalog validation failed",{duplicate,missingSpecs,missingContent,missingRouting,weakSpecs,invalidPricing});
 process.exitCode=1;
}else{
 console.log("Catalog validation passed for "+keys.length+" templates with specs, content, routing and RFQ-only safeguards.");
}