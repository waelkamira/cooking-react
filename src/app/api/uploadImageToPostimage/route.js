export async function POST(req, res) {
  const formData = await req.formData();
  const file = formData.get('image');

  // Replace with your Postimage API key
  const apiKey = '4f08e09ed56d3c364c9ac82250f99ee6';

  const response = await fetch('https://api.postimage.org/v2/upload', {
    method: 'POST',
    body: file,
    headers: {
      Authorization: `API-KEY ${apiKey}`,
    },
  });

  const imageData = await response?.json();

  return Response.json(imageData);
}
