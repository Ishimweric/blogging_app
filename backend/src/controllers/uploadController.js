const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Validate file
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    setError('Only JPEG, PNG, GIF, or WebP images are allowed');
    return;
  }

  // Preview image
  const reader = new FileReader();
  reader.onloadend = () => setImagePreview(reader.result);
  reader.readAsDataURL(file);

  // Upload to server
  const uploadFormData = new FormData();
  uploadFormData.append('image', file);

  try {
    setUploading(true);
    setError(null);
    
    const response = await api.post('/posts/upload', uploadFormData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    // Ensure we have a proper URL
    let imageUrl = response.data.url;
    if (!imageUrl.startsWith('http')) {
      imageUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}${imageUrl}`;
    }

    setFormData(prev => ({ ...prev, image: imageUrl }));
  } catch (err) {
    setError(err.response?.data?.message || 'Image upload failed');
    setImagePreview(null);
  } finally {
    setUploading(false);
  }
};