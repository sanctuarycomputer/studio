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
