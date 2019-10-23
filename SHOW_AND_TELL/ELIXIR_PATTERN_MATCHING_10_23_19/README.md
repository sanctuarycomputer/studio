# Elixir
Elixir is an immutable and dynamically typed functional programming language built on top of the Erlang VM, BEAM. It utilizes many of Erlang's syntactic features and programming concepts. Elixir adds features, quality of life improvements and powerful build tools that help transform the battle tested Erlang into a top of the line modern programming language.

Companies like Whatsapp, Discord and Goldman Sachs use Erlang and Elixir in applications that support millions of users and handle millions of events per hour.  

# Pattern Matching in Elixir

Pattern matching is a core feature of Elixir that allows us to "match" data against patterns and other data. It's a powerful tool that helps simplify working with data in Elixir, while making our code even more expressive.  


# The Match Operator - `=`

While the match operater is the equals symbol, it should not be thought of in the way we typically use `=` in other languages like java or javascript. It is not used for assigning data to a variable, rather, the match operator checks if the expressions on either side of the operator match or, in a way, are equivalent. You can think of the match operator as allowing a programmer to interact with data as if they are writing algebra.  


```Elixir
  iex(1)> a = 0
  0
```

Rather than assigning data to a variable, the match operator binds variables to information that is stored in the current scope's memory. Since data in Elixir is immutable, if we were to re-bind a variable, it would be pointing to a new address in memory.
https://Elixirforum.com/t/whats-the-difference-between-variable-binding-and-assignment/4971  

```Elixir
  iex(6)> b = a            
  0
  iex(7)> b
  0
```

```Elixir
  iex(4)> 4 = 2 + 2
  4
```

```Elixir
  iex(10)> s = "string" = "string"
  "string"
  iex(11)> s
  "string"
```

```Elixir
  iex(5)> 1 = a
  ** (MatchError) no match of right hand side value: 0
```

Pattern matching in Elixir works from right to left, where the expression on the right hand side of the operation is matched to the pattern on the left. When the two sides don't match, an error is raised.  

```Elixir
  iex(1)> %{"data" => %{"foo" => bar, "is_data?" => is_data?}} = %{"data" => %{"foo" => "baz", "is_data?" => true}}
  iex(2)> is_data?
  true
  iex(3)> bar
  "baz"
```

```Elixir
  iex(4)> [head|tail] = ["a", "b", "c", "d"]
  ["a", "b", "c", "d"]
  iex(5)> head
  "a"
  iex(6)> tail
  ["b", "c", "d"]
```

Pattern matching makes easy work of simple data structures.

# Pattern Matching in Function Definitions

```Elixir
  defmodule FunctionEx0 do
    def add(a) do
      a
    end

    def add(a, b) do
      a + b
    end

    def add(a, b, c) do
      a + b + c
    end
  end
```  

Similarly to method overloading in languages like Java, Elixir allows you to define multiple copies of functions that each accept different arguments.

```Elixir
  defmodule FunctionEx1 do
    def do_work(true) do
      IO.puts("work")
    end

    def do_work(false) do
      nil
    end
  end

```

```Elixir
  iex(2)> FunctionEx1.do_work(false)
  nil
  iex(3)> FunctionEx1.do_work(true) 
  work
  :ok
```  

You can use pattern matching in a function's arguments to perform different operations based on what is passed into the function.

```Elixir
  defmodule FunctionEx2 do

    def iterate_list([head|[]]) do
      IO.puts(head)
    end

    def iterate_list([head|tail]) do
      IO.puts(head)
      iterate_list(tail)
    end

    def iterate_list([]) do
      {:error, :list_is_empty}
    end

    def iterate_list(_) do
      {:error, :not_a_list}
    end

    def iterate_list() do
      {:error, :pass_list_as_argument}
    end
  end
```

```elixir
  iex(1)> FunctionEx2.iterate_list(["here", "is", "some", "stuff"])
  here
  is
  some
  stuff
  :ok
```

Elixir's pattern matching can be used to simplify writing and reading recursive code.

# Pattern Matching in Control Flow Structures

Pattern matching helps keep control flow condensed and predictable.

```Elixir
  defmodule ControlEx0 do
    def iterate_list(list) do
      case FunctionEx2.iterate_list(list) do
        :ok ->
          IO.puts("iterated the list!")

        {:error, reason} ->
          IO.puts("failed to iterate the list - reason: #{reason}")

        _ ->
          IO.puts("I have no idea why we're here")
      end
    end
  end
```

```Elixir
  defmodule ControlEx1 do
    @items [
      {:rock, "quartz"},
      {:food, "strawberry"}
    ]

    def get_item(item_number) do
      Enum.at(@items, item_number)
    end

    def eat(item) do
      if match?({:food, _}, item) do
        {:food, food_item} = item
        IO.puts("yum, you eat #{food_item}!")
      end
    end
  end
```
