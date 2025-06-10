## Como funciona o switchMap e qual a diferenca com o mergeMap?

```
   🔄 switchMap

   Se source$ emitir múltiplos valores rapidamente (ex: digitação do usuário), o switchMap descarta as chamadas antigas e só mantém a última.
   
   "Novo valor chegou? Cancela o anterior e começa esse novo."


   Use switchMap quando quiser que só a resposta mais recente importe.
```

```
   🔀 mergeMap

   Não cancela requisições anteriores.

   Permite que várias requisições aconteçam em paralelo, e todas sejam processadas.

   Se o source$ emitir múltiplos valores rapidamente, o mergeMap dispara todas as chamadas, e elas chegam conforme forem finalizadas.
```

## Entao o merge map é mais custoso e realiza mais chamadas http dependendo do contexto?

```
   Sim, executa todas as requisições que forem emitidas pelo fluxo original, independentemente de quantas e com que frequência.

   Permite concorrência total, o que pode ser bom ou ruim dependendo do caso.

   Se o usuário digitar “p”, “pi”, “pik”, “pika”, “pikac”, “pikach”, “pikachu” rapidamente, o mergeMap vai:

   👉 Fazer 7 chamadas HTTP para cada etapa.

   Mesmo que o usuário só queria o resultado final (“pikachu”), todas as chamadas anteriores ainda são enviadas e processadas.
```