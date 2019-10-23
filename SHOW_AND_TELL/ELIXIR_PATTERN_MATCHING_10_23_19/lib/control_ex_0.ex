defmodule ControlEx0 do

  def iterate_list(list) do
    case FunctionEx2.iterate_list(list) do
      :ok ->
        IO.puts("iterated the list!")

      {:error, reason} ->
        IO.puts("failed to iterate the list - reason: #{reason}")
    end
  end
end
