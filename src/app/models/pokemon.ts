interface PokemonSummary {
   count: number
   results: Pokemon[]
}

interface Pokemon {
   name: string
   url: string
}

interface PokemonDetails {
   id: number
   name: string
   height: 35
   weight: 650
}

interface PokemonCustomDetails extends PokemonDetails {
   favorite: boolean
}

export {
   type PokemonSummary,
   type Pokemon,
   type PokemonDetails,
   type PokemonCustomDetails
}