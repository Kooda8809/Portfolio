export interface ProjetoBruto {
  id?: string
  projeto_id?: string
  titulo?: string
  nome?: string
  descricao?: string
  desc?: string
  categoria?: string
  tipo?: string
  youtube_id?: string
  video_id?: string
  id_video?: string
  thumb_url?: string
  thumbnail?: string
  miniatura?: string
  [key: string]: string | undefined
}

export interface Projeto {
  id: string
  titulo: string
  descricao: string
  categoria: string
  youtubeId: string
  thumbnail: string
}

const GOOGLE_SHEET_ID = "1NC5sYE2DDQNpIO2KpN_0-wUy26QM7QCd5rDn-Wwlxw8"

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]

    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        current += ch
      }
    } else {
      if (ch === '"') {
        inQuotes = true
      } else if (ch === ',') {
        result.push(current)
        current = ''
      } else {
        current += ch
      }
    }
  }
  result.push(current)
  return result
}

function parseCSV(csv: string): ProjetoBruto[] {
  const rows = csv
    .split(/\r?\n/)
    .map((linha) => linha.trim())
    .filter((linha) => linha.length > 0)

  if (rows.length < 2) return []

  const headers = parseCSVLine(rows[0])
  const dados: ProjetoBruto[] = []

  for (let i = 1; i < rows.length; i++) {
    const values = parseCSVLine(rows[i])
    if (values.length === 0) continue

    const obj: ProjetoBruto = {}
    headers.forEach((header, idx) => {
      obj[header.trim().toLowerCase()] = (values[idx] || '').trim()
    })
    dados.push(obj)
  }

  return dados
}

function normalizarProjeto(row: ProjetoBruto, index: number): Projeto {
  return {
    id: row.id || row.projeto_id || `proj-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 7)}`,
    titulo: row.titulo || row.nome || 'Sem título',
    descricao: row.descricao || row.desc || '',
    categoria: row.categoria || row.tipo || 'geral',
    youtubeId: row.youtube_id || row.video_id || row.id_video || '',
    thumbnail: row.thumb_url || row.thumbnail || row.miniatura || '',
  }
}

export async function fetchPortfolioData(): Promise<Projeto[]> {
  const csvUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?csv=pq&sheet=1`

  const response = await fetch(csvUrl)
  if (!response.ok) throw new Error(`HTTP ${response.status}`)

  const csvText = await response.text()
  const dadosBrutos = parseCSV(csvText)

  const projetos = dadosBrutos
    .map((row, index) => normalizarProjeto(row, index))
    .filter((p) => p.titulo && p.titulo !== 'Sem título')

  return projetos
}