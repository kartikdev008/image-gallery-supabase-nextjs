export default async function handler(req, res) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
    console.log(res);
  }

  try {
    await res.revalidate("/");
    console.log(res);
    return res.json({ revalidated: true });
  } catch (err) {
    console.log(res);
    return res.status(500).send("Error revalidating");
  }
}
