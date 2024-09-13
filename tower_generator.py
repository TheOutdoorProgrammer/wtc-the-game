from bs4 import BeautifulSoup
import json

with open("floor_to_elevator.json", "r") as f:
    floor_to_elevator = json.load(f)

def generate_elevator_map(floor):
    floors_that_are_mechnical_rooms = ["7", "8", "41", "42", "75", "76"]
    if floor in floors_that_are_mechnical_rooms:
        return []

    return floor_to_elevator[floor]

def build_tower(tower_to_build):

    empty_floor_object = {
        "name": "Empty Floor",
        "wikiPage": None
    }

    # read tower_1.html from a file
    with open(f"{tower_to_build}.html", "r") as f:
        tower_html = f.read()

    # parse the html
    soup = BeautifulSoup(tower_html.encode('utf-8'), "html.parser", from_encoding="utf-8")
    table = soup.find("table")

    tower = {}
    floors = 110

    rows = table.find_all('tr')
    for row in rows:
        floor = row.find('th').get_text().strip().replace('\n', '')

        # Skip the table headers
        if floor == "Fl#" or floor == "Floor #" or floor == "NA":
            continue

        # Create missing floors
        while floor != str(floors):
            if floors <= 0:
                break
            print(f"Creating missing floor {floors}")
            tower[floors] = {
                "directory": empty_floor_object
            }
            floors -= 1


        # Create the directory for the floow
        directory = []
        cells = row.find_all('td')
        cell_counter = 0
        for cell in cells:

            # Tower 2 has an extra cell that we need to skip, "business" column in table
            cell_counter += 1
            if cell_counter == 2:
                continue

            # Process companies with an anchor tag
            companies = cell.find_all('a')
            for company in companies:
                link = company["href"]
                directory.append({
                    "name": company.get_text(),
                    "wikiPage": link.replace('\u2013', '-')
                })

                # Delete the company from the dom so we can process non-linked companies later
                company.clear()

            # Process floors that wikipedia labels as "-", assume they are empty floors
            companies_in_row = cell.get_text().split(",")
            if len(companies_in_row) == 1 and companies_in_row[0].strip().replace('\n', '') == '-':
                directory.append(empty_floor_object)
                continue

            # Ensure that companies without an anchor tag are processed
            companies = cell.get_text().split(",")
            companies = list(filter(None, companies))
            companies = [x.strip() for x in companies if x.strip() != '']
            for company in companies:
                company = company.replace('\n', '')
                directory.append({
                    "name": company,
                    "wikiPage": None
                })

        # Add the floor to the tower
        tower[floor] = {
            "directory": directory,
            "elevators": generate_elevator_map(floor)
        }

        floors -= 1

    # The wikipedia page for tower 1 does not include a basement floor
    if tower_to_build == "tower_1":
        tower["B"] = {
            "directory": empty_floor_object,
            "elevators": generate_elevator_map("B")
        }

    #print(json.dumps(tower, indent=4))
    with open(f"{tower_to_build}.json", "w") as f:
        f.write(json.dumps(tower, indent=4))

towers = [
    "tower_1",
    "tower_2"
]

for tower in towers:
    build_tower(tower)