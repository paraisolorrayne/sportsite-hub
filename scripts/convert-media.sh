#!/bin/bash
# ──────────────────────────────────────────────────────────────
# convert-media.sh
# Converte arquivos .heic → .jpg e .mov → .mp4 dentro de src/assets/
#
# Uso:
#   ./scripts/convert-media.sh          # converte tudo
#   ./scripts/convert-media.sh heic     # só imagens .heic
#   ./scripts/convert-media.sh mov      # só vídeos .mov
# ──────────────────────────────────────────────────────────────

set -euo pipefail
ASSETS_DIR="$(cd "$(dirname "$0")/.." && pwd)/src/assets"

echo "📁 Buscando mídias em: $ASSETS_DIR"
echo ""

MODE="${1:-all}"  # all | heic | mov

# ─── HEIC → JPG ───────────────────────────────────────────────
convert_heic() {
    local count=0
    while IFS= read -r -d '' f; do
        out="${f%.heic}.jpg"
        if [ -f "$out" ]; then
            echo "  ⏭  Já existe: $(basename "$out")"
        else
            echo "  🖼  Convertendo: $(basename "$f") → $(basename "$out")"
            sips -s format jpeg "$f" --out "$out" --setProperty formatOptions 85 > /dev/null 2>&1
            ((count++))
        fi
    done < <(find "$ASSETS_DIR" -iname "*.heic" -print0 2>/dev/null)

    # Also handle uppercase .HEIC
    while IFS= read -r -d '' f; do
        out="${f%.HEIC}.jpg"
        if [ -f "$out" ]; then
            echo "  ⏭  Já existe: $(basename "$out")"
        else
            echo "  🖼  Convertendo: $(basename "$f") → $(basename "$out")"
            sips -s format jpeg "$f" --out "$out" --setProperty formatOptions 85 > /dev/null 2>&1
            ((count++))
        fi
    done < <(find "$ASSETS_DIR" -name "*.HEIC" -print0 2>/dev/null)

    echo "  ✅ $count imagens HEIC convertidas para JPG"
}

# ─── MOV → MP4 ────────────────────────────────────────────────
convert_mov() {
    if ! command -v ffmpeg &> /dev/null; then
        echo "  ❌ ffmpeg não encontrado. Instale com: brew install ffmpeg"
        return 1
    fi

    local count=0
    while IFS= read -r -d '' f; do
        out="${f%.*}.mp4"
        if [ -f "$out" ]; then
            echo "  ⏭  Já existe: $(basename "$out")"
        else
            echo "  🎬 Convertendo: $(basename "$f") → $(basename "$out")"
            ffmpeg -i "$f" \
                -c:v libx264 -preset slow -crf 26 \
                -vf "scale='min(1080,iw)':-2" \
                -c:a aac -b:a 128k \
                -movflags +faststart \
                -y "$out" 2>/dev/null
            ((count++))
        fi
    done < <(find "$ASSETS_DIR" -iname "*.mov" -print0 2>/dev/null)

    echo "  ✅ $count vídeos MOV convertidos para MP4"
}

# ─── Execução ─────────────────────────────────────────────────
case "$MODE" in
    heic)
        echo "🖼  Convertendo imagens HEIC..."
        convert_heic
        ;;
    mov)
        echo "🎬 Convertendo vídeos MOV..."
        convert_mov
        ;;
    all)
        echo "🖼  Convertendo imagens HEIC..."
        convert_heic
        echo ""
        echo "🎬 Convertendo vídeos MOV..."
        convert_mov
        ;;
    *)
        echo "Uso: $0 [all|heic|mov]"
        exit 1
        ;;
esac

echo ""
echo "🎉 Conversão concluída!"
echo "   Os arquivos .jpg/.mp4 gerados já são reconhecidos automaticamente pelo Vite."
