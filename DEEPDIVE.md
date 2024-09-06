# Bud Deep Dive - WIP

## Types

Bud is a strong typed language, and it's recommended to use its types for all sort of values. For now, the types will be considered identical to TypeScript types.

The only difference for now between Bud types and TypeScript types is that Bud types exist also in the runtime of the program, and not only in the compilation time. 

## Block Declaration

Block is a scope of code. The default behavior of a scope is to be executed immediately whenever the program gets there.

In some cases, though, the blocks can be assigned to another instruction which then controls the block's execution. 

In Bud you define blocks by putting your code between `{` and `}`. For example:

```js
{
	// code
}
```

This code creates a simple block which will be executed immediately when the program gets there. 

Block has a few special tools and features; they will be discussed in latter sections.

## Variable Declaration

All variables in Bud are working in the same way behind the scenes. They are all scoped and destroyed and the end of the current block.

In order to declare a new scoped variable in Bud you should use the `set` keyword. Like that:

```js
set hello = "world";
```

Important concept in Bud is that every variable you declare is a constant, and therefore cannot be changed. This is for safety reasons.

In order to create mutable variables, you need to add the `mut` keyword, like that:

```js
set mut hello = "world";
``` 

The default behavior of variables is to be assigned as the type `any`. Which means anything can be put in them.

It is recommended though to specify a type for a variable, and it can be done similarly to TypeScript, like this:

```ts
set hello: string = "world";
```