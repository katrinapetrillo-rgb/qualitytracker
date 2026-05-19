export default async function handler(req, res) {
  const { url, filename } = req.query;
  if (!url) return res.status(400).end('Missing url');
  
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const contentType = response.headers.get('content-type') || 'application/octet-stream';
  
  res.setHeader('Content-Disposition', `attachment; filename="${filename || 'download'}"`);
  res.setHeader('Content-Type', contentType);
  res.send(Buffer.from(buffer));
}
