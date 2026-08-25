#!/usr/bin/env bash
# Updates the version file, the README.md, when the project's version is changed
# @author wpomier 2026-08-24
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd -P)"
VFILE="$ROOT/src/version.ts"
README="$ROOT/README.md"
TOOLMD="$ROOT/docs/tool_comparison.md"
version=$(node -p "require('$ROOT/package.json').version")

# Change readme
changeBlock() {
    awk -v content="$2" "
        /<!-- Begin $1 -->/ { print;print content; skip=1; next }
        /<!-- End $1 -->/   { skip=0 }
        !skip" "$README" \
    > "$README.tmp" && mv "$README.tmp" "$README"
}

changeExample() {
    id="$1"
    input="$2"
    text=$(
        node -e "
            jsonCompress = require('$ROOT/dist/index');
            const input = $input;
            const sinput  = JSON.stringify(input);
            const pinput  = JSON.stringify(input, null, 2);
            const output  = jsonCompress.compress(input);
            const soutput = JSON.stringify(output);
            const poutput = JSON.stringify(output, null, 2);
            console.log([
                \`## Compression Example #$id\`,
                \`### Input JSON (\${sinput.length} bytes)\`,
                '\`\`\`json',
                pinput,
                '\`\`\`',
                \`### Compressed JSON (\${soutput.length} bytes)\`,
                '\`\`\`json',
                poutput,
                '\`\`\`'
            ].join('\n'))
        "
    )
    changeBlock "Example#$id" "$text"
}

# Changing version
echo "export const VERSION = '$version';" > "$VFILE"

# Include the first lines of tool_comparison.md
changeBlock "Benchmark" "$(head -9 "$TOOLMD")"

# Cria e inclui exemplos
changeExample 1 '{"description":"This is example json","entities":[{"id":100,"name":"Dog","desc":"This is desc of dog","tag":["animal"]},{"id":101,"name":"Cat","desc":"This is desc of cat","tag":["animal"]}],"notes":["Unique string will be kept as is","Duplicated string will be combined","Duplicated string will be combined"]}'
changeExample 2 '{"tournaments":[{"extraPoints":{"Jogos":"9§0§","Participação":"3§20§"},"id":35,"phases":[{"groupName":"A","phase":1,"clubId":3,"matches":[{"id":1,"numFrames":5,"details":null,"eta":"2025-03-29T12:00:00.000Z","tableNo":1,"clubId":3,"startedAt":"2025-03-29T12:03:38.000Z","endedAt":"2025-03-29T13:04:43.000Z","players":[{"pk":12973,"id":111,"wins":3,"wo":false,"points":3},{"pk":12972,"id":330,"wins":0,"wo":false,"points":0}],"referee":{"pk":12974,"id":null,"wo":false}},{"id":3,"numFrames":5,"details":{"winner":{"bonus":3,"groupPos":1}},"eta":"2025-03-29T12:00:00.000Z","tableNo":1,"clubId":3,"startedAt":"2025-03-29T13:05:06.000Z","endedAt":"2025-03-29T14:37:25.000Z","players":[{"pk":12978,"id":111,"wins":1,"wo":false,"sourceMatchId":1,"sourceMatchWho":"winner","points":1},{"pk":12979,"id":115,"wins":3,"wo":false,"sourceMatchId":2,"sourceMatchWho":"winner","points":6}],"referee":{"pk":12980,"id":262,"wo":false,"sourceMatchId":2,"sourceMatchWho":"loser"}},{"id":5,"numFrames":5,"details":{"winner":{"groupPos":2}},"eta":"2025-03-29T12:00:00.000Z","tableNo":1,"clubId":3,"startedAt":"2025-03-29T14:59:10.000Z","endedAt":"2025-03-29T15:50:29.000Z","players":[{"pk":12984,"id":111,"wins":3,"wo":false,"sourceMatchId":3,"sourceMatchWho":"loser","points":3},{"pk":12985,"id":330,"wins":0,"wo":false,"sourceMatchId":4,"sourceMatchWho":"winner","points":0}],"referee":{"pk":12986,"id":262,"wo":false,"sourceMatchId":4,"sourceMatchWho":"loser"}}]},{"groupName":"OITAVAS","phase":3,"clubId":3,"matches":[{"id":54,"numFrames":5,"details":{"winner":{"bonus":2}},"eta":null,"tableNo":null,"clubId":3,"startedAt":"2025-03-29T18:01:38.000Z","endedAt":"2025-03-29T20:03:37.000Z","players":[{"pk":13123,"id":111,"wins":2,"wo":false,"sourceMatchId":5,"sourceMatchWho":"winner","points":2},{"pk":13124,"id":116,"wins":3,"wo":false,"sourceMatchId":23,"sourceMatchWho":"winner","points":5}],"referee":{"pk":null,"id":null,"wo":null}}]}]}]}'
