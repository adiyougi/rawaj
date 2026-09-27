import fs from "node:fs";
const load=(name)=>fs.readFileSync(new URL("../"+name,import.meta.url),"utf8");
const templates=load("lib/service-templates.ts");
const specs=load("lib/service-specs.ts");
const rich=load("lib/service-content.ts")+load("lib/service-content-exhibitions.ts")+load("lib/service-content-specialty.ts")+load("lib/service-content-creative.ts");
const keys=Array.from(templates.matchAll(/\["([^"]+)","/g),m=>m[1]);
const duplicate=keys.filter((key,index)=>keys.indexOf(key)!==index);
const missingSpecs=keys.filter(key=>!specs.includes(key));
const missingContent=keys.filter(key=>!rich.includes(key));
if(duplicate.length||missingSpecs.length||missingContent.length){
 console.error("Catalog validation failed",{duplicate,missingSpecs,missingContent});
 process.exitCode=1;
}else{
 console.log("Catalog validation passed for "+keys.length+" templates.");
}
