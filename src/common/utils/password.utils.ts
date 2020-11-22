const bcrypt = require('bcrypt');


export function hash(text: string): string {
  return bcrypt.hashSync(text, 6, async function(err, hash) {
    if (err) throw Error(err.message);
    return hash;
  });
}

export async function compare(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

