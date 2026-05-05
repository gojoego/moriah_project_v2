import bcrypt from "bcrypt";

async function tempHash() {
    const hash = await bcrypt.hash("moriah123", 10)
    console.log(hash);
}

tempHash();