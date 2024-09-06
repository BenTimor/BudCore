# Bud General Concepts

Bud is a programming language which is compiled to TypeScript and JavaScript. The language is similar to TypeScript.

When reading this document, consider the concepts as changes to TypeScript and not as a full language declaration. Most of the things that are not specified here are similar to TypeScript. A more proper documentation will be written in the future.

Additionally, the language doesn't exist yet, and this document is only my initial thoughts about how it should look. It might change during development.

## Async First

All of the operations in Bud are asynchronous from the developer's perspective. There are no synchronous operations.

Bud might perform synchronous operations behind the scenes though.

## Await First

Bud always waits for asynchronous operations to complete and blocks the current block until specified otherwise.

The action of **not** waiting for something is called *freeing* because it's freeing the operation from the current block. 

In order to *free* an operation we'll use the `free` word. For example, freeing a function named 'banana' will look like this:

```ts
free banana();
```

## Expression Oriented

In Bud everything is an expression and returns a value. For example, you can assign a conditional value to a variable like that:

```ts
variable = if (expression) {
	return "hello";
}
else {
	return "world";
};
```

## Block Identifier 

Every block of code might have an optional scope-unique identifier. This identifier can be used later for all sort of things.
For example, an identifier will let you know how much time a block was executed. 

```js
if (expression1) first: {
	//
}

if (expression2) second: {
	//
}

if (first.executed && second.executed) {
	// 
}
```

## Happy Flow Last

Bud will have lots of options to allow you to move inside and outside of blocks. This way you can handle validations, edge cases and non-happy flows first. Then when you finish with all of them, you can break out of their block and get to the happy flow.

This way the code is a lot more readable and maintainable. 

Those options include:

1. `break` and `continue` will always perform the action on the current block. Doesn't matter if the block is connected to a loop or not.
2. `break` and `continue` will be able to get an optional `[name]` parameter. This parameter will allow you to perform those actions on another block of code.

An example for a code with *Happy Flow Last* in mind:

```js
for (val of arr) main: {
	if (type issues): issues {
		if (can be converted) {
			val = convert val;
			break issues ; // Gets us back to the for loop block
		}
		
		if (type we can skip) {
			continue main; // Jumps to the start of the for loop
		}
		
		break main; // Breaks out of the for
	}

	while (val) {
		// operations
		continue main; // Jump to the start of the for loop
	}
	
	// Happy flow business logic comes here
}
```

## Everything Can Be Proxied

Let's say you just created a variable, and you want to perform a side effect every time this variable is changed. You will be able to proxy the variable and modify its behavior. Like that:

```js
variable = 1;

proxy variable {
	set(v) {
		// run side effect
		return v; // Returns the value that should be set
	}
}
```

You'll be able to add more proxies on a proxied variable. The first proxy you add will be the first to run, the last will be the last to run.

## Function Caching

Functions can cache their returned value in order to prevent them from calculating again static values that will never change. 

As a default mechanism, you can just add the `cache` command to the function definition, and then the next time the function will be called with the same parameters the last returned value will be returned.

> (Open question: What's considered as 'same parameters'?)

For example:
```ts
cache add(a, b) {
	return a + b;
}

add(1,2); // Calculating the value and returning 3
add(1,2); // Returning the value 3 from caching
```

Another option is to cache function results by specific identifiers. This way, you can tell Bud to cache every value as long as those parameters stay the same. This works by passing an object to the `cache` command. Like that:

```ts
// As long as either the user's id or the user's phone and mail matching the cache, returns from cache
// (id in cache) OR (phone in cache AND mail in cache) return user from cache;
readUserFromDB(identifiers) {
	cache { phone: identifiers.phone, mail: identifiers.mail };
	cache { id: identifiers.id };
	// logic
	return user;
}
```

The `cache` command can be put anywhere inside the function, and whenever Bun will reach this value, it'll check if it can match anything from the cache to return.

If you called the `cache` command and nothing is cached for those values, Bud will make sure to cache the value for those parameters when the function returns something.

## Documentation

In Bun you can document pretty much everything. For example:

1. Functions' purpose
2. Parameters' description and examples
3. Return values

And possibly more.

## Reflection (for AI tooling for example)

Bun supports reflection features which allow you to convert functions to tools which can be used by APIs. You can do all sort of things like:

1. Getting the information about the parameters of a function - including their types and their description.
2. Getting the description of a function.
3. Invoking a function using raw data.

For example:
```ts
add(a: number, b: number) {
	return a + b;
}

add.parameters["a"].type; // returns "number"

add.invoke({ a: 1, b: 2 }); // returns 3
```

## Other Ideas to Think About

1. An option to rerun functions in case of exceptions
2. An option to rewrite a function in case of exception, and execute the new function instead
3. Caching options (caching for X amount of time, connecting to external services, clear caching, force recache)
4. Event system
5. Decorators
