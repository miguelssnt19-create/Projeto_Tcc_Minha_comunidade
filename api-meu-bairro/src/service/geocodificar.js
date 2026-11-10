
// Consulta ao Nominatim (OpenStreetMap) para converter endereço em coordenadas.
export async function geocodificar(endereco) {
  const texto = String(endereco ?? "").trim();

  if (!texto) {
    return { latitude: null, longitude: null };
  }

  try {
    const consulta = `${texto}, Brasil`;

    const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(consulta)}`;

    const resposta = await fetch(url, {
      headers: {
        "User-Agent": "MinhaComunidadeTCC/1.0 (projeto educacional)"
      }
    });

    if (!resposta.ok) {
      return { latitude: null, longitude: null };
    }

    const resultados = await resposta.json();

    if (!resultados.length) {
      return { latitude: null, longitude: null };
    }

    const latitude = Number(resultados[0].lat);
    const longitude = Number(resultados[0].lon);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return { latitude: null, longitude: null };
    }

    return { latitude, longitude };

  } catch {
    return { latitude: null, longitude: null };
  }
}

