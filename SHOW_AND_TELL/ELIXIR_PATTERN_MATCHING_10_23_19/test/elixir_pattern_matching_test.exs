defmodule ElixirPatternMatchingTest do
  use ExUnit.Case
  doctest ElixirPatternMatching

  test "greets the world" do
    assert ElixirPatternMatching.hello() == :world
  end
end
