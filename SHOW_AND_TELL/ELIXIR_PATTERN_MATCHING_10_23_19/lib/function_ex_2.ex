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
