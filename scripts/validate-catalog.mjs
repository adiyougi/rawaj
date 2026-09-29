import fs from "node:fs";
const load=(name)=>fs.readFileSync(new URL("../"+name,import.meta.url),"utf8");
const templates=load("lib/service-templates.ts");
const specs=load("lib/service-specs.ts");
const rich=load("lib/service-content.ts")+load("lib/service-content-exhibitions.ts")+load("lib/service-content-specialty.ts")+load("lib/service-content-creative.ts");
const routing=load("lib/catalog-routing.ts");
const keys=Array.from(templates.matchAll(/\["([^"]+)","/g),m=>m[1]);
const duplicate=keys.filter((key,index)=>keys.indexOf(key)!==index);
const specBlock=(key)=>{
 const quoted=specs.indexOf(`"${key}": [`);
 const plain=specs.indexOf(`${key}: [`);
 const start=quoted>=0?quoted:plain;
 if(start<0)return "";
 const end=specs.indexOf("\n  ],",start);
 return specs.slice(start,end<0?start+5000:end);
};
const missingSpecs=keys.filter(key=>!specBlock(key));
const emptySpecs=keys.filter(key=>{
 const block=specBlock(key);
 if(!block)return false;
 const explicit=(block.match(/\{\s*key\s*:/g)||[]).length;
 return explicit===0 && !block.includes("quoteQty(");
});
const missingContent=keys.filter(key=>!rich.includes(key));
const missingRouting=keys.filter(key=>!routing.includes(key));
const weakSpecs=keys.filter(key=>{
 const block=specBlock(key);
 if(!block)return false;
 const hasGroup=/group\s*:/.test(block);
 const rfqDriverKeys=["scope","service","deliverables","coverage","job","production","execution","install","installation","delivery"];
 const hasRfqDriver=block.includes("quoteQty(")
   || /type\s*:\s*"number"/.test(block)
   || rfqDriverKeys.some(key=>new RegExp('key\\s*:\\s*"'+key+'"').test(block));
 return !hasGroup||!hasRfqDriver;
});
const invalidPricing=/\b(price|price_cents|unit_price|fixed_price)\b\s*[:=]/i.test(templates+specs+rich);
if(duplicate.length||missingSpecs.length||emptySpecs.length||missingContent.length||missingRouting.length||weakSpecs.length||invalidPricing){
 console.error("Catalog validation failed",{duplicate,missingSpecs,emptySpecs,missingContent,missingRouting,weakSpecs,invalidPricing});
 process.exitCode=1;
}else{
 console.log("Catalog validation passed for "+keys.length+" templates with specs, content, routing and RFQ-only safeguards.");
}