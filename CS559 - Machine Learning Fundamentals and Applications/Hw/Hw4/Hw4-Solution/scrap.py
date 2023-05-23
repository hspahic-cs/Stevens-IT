# ly = less yes, mn = more no
def calculate_gini(ly, ln, my, mn):
    total = ly + ln + my + mn
    less_total = ly + ln
    more_total = my + mn
    if(less_total == 0):
        return (more_total / total) * (1 - (my / more_total) ** 2 - (mn / more_total) ** 2)
    elif(more_total == 0):
        return (less_total / total) * (1 - (ly / less_total) ** 2 - (ln / less_total) ** 2)
    return (less_total / total) * (1 - (ly / less_total) ** 2 - (ln / less_total) ** 2) + (more_total / total) * (1 - (my / more_total) ** 2 - (mn / more_total) ** 2)

if __name__ == "__main__":
    print(f"0th gini = {calculate_gini(0, 0, 4, 5)}")
    print(f"1st gini = {calculate_gini(1, 0, 3, 5)}")
    print(f"2nd gini = {calculate_gini(1, 1, 3, 4)}")
    print(f"3rd gini = {calculate_gini(2, 1, 2, 4)}")
    print(f"4th gini = {calculate_gini(2, 3, 2, 2)}")
    print(f"5th gini = {calculate_gini(3, 3, 1, 2)}")
    print(f"6th gini = {calculate_gini(4, 4, 0, 1)}")
    print(f"7th gini = {calculate_gini(4, 5, 0, 0)}")