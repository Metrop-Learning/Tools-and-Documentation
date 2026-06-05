import data from "https://metrop-learning.github.io/metrop.geo.database/boundaries.json" with { type: "json" };

let accepted = {"ukc":true,"l1":true,"l2":true,"l3":true,"l4":true}

function defineTable(){
    document.getElementById("databaseTable").innerHTML = "<thead><tr><th>#</th><th>ID</th><th>Element</th><th>Name EN</th><th>Name FR</th><th>Name JP</th><th>Name ES</th><th>Name IT</th><th>Name EO</th><th>Flag</th><th>Population</th><th>Content</th></tr></thead><tbody id='databaseTableBody'></tbody>"
    let countLV1 = 0
    for(let element in data){
        if (element == "DB:INFO"){
            continue
        }
        if(accepted["l1"]){
            countLV1++
            const continentDIV = document.createElement("tr")
            continentDIV.innerHTML = `<td>${countLV1}</td><td>${element}</td><td>${element == "WD" ? "World" : "Continent"}</td><td>${data[element].nameen ?? "N/A"}</td><td>${data[element].namefr ?? "N/A"}</td><td>${data[element].namejp ?? "N/A"}</td><td>${data[element].namees ?? "N/A"}</td><td>${data[element].nameit ?? "N/A"}</td><td>${data[element].nameeo ?? "N/A"}</td><td>${data[element].flag ? ('<img src="' + data[element].flag + '">') : "N/A"}</td><td>${data[element].population ?? "N/A"}</td><td>${data[element].content ?? "N/A"}</td>`
            document.getElementById("databaseTableBody").appendChild(continentDIV)
        }
        for(let el_c in data[element].get){
            let allow = false
            if(el_c.split(":")[0] == "UKC" && accepted.ukc){
                allow = true
            }
            else if (accepted["l2"] && el_c.split(":")[0] != "UKC"){
                allow = true
            }
            if(allow){
                countLV1++
                const continentDIV = document.createElement("tr")
                continentDIV.innerHTML = `<td>${countLV1}</td><td>${element + "-" + el_c}</td><td>${el_c.split(":")[0] == "UKC" ? "Crown Dependencies" : "Country"}</td><td>${data[element].get[el_c].nameen ?? "N/A"}</td><td>${data[element].get[el_c].namefr ?? "N/A"}</td><td>${data[element].get[el_c].namejp ?? "N/A"}</td><td>${data[element].get[el_c].namees ?? "N/A"}</td><td>${data[element].get[el_c].nameit ?? "N/A"}</td><td>${data[element].get[el_c].nameeo ?? "N/A"}</td><td>${data[element].get[el_c].flag ? ('<img src="' + data[element].get[el_c].flag + '">') : "N/A"}</td><td>${data[element].get[el_c].population ?? "N/A"}</td><td>${data[element].get[el_c].content ?? "N/A"}</td>`
                document.getElementById("databaseTableBody").appendChild(continentDIV)
            }
            for(let el_sub in data[element].get[el_c].get){
                let allow_s1 = false
                if(accepted["l3"]){
                    allow_s1 = true
                }
                if(allow_s1){
                    countLV1++
                    const continentDIV = document.createElement("tr")
                    continentDIV.innerHTML = `<td>${countLV1}</td><td>${element + "-" + el_c + "-" + el_sub}</td><td>${el_c == "FRA" ? "Region" : el_c == "USA" || el_c == "DEU" ? "States" : "Subdivision"}</td><td>${data[element].get[el_c].get[el_sub].nameen ?? "N/A"}</td><td>${data[element].get[el_c].get[el_sub].namefr ?? "N/A"}</td><td>${data[element].get[el_c].get[el_sub].namejp ?? "N/A"}</td><td>${data[element].get[el_c].get[el_sub].namees ?? "N/A"}</td><td>${data[element].get[el_c].get[el_sub].nameit ?? "N/A"}</td><td>${data[element].get[el_c].get[el_sub].nameeo ?? "N/A"}</td><td>${data[element].get[el_c].get[el_sub].flag ? ('<img src="' + data[element].get[el_c].get[el_sub].flag + '">') : "N/A"}</td><td>${data[element].get[el_c].get[el_sub].population ?? "N/A"}</td><td>${data[element].get[el_c].get[el_sub].content ?? "N/A"}</td>`
                    document.getElementById("databaseTableBody").appendChild(continentDIV)
                }
                for(let el_subsub in data[element].get[el_c].get[el_sub].get){
                    let allow_s2 = false
                    if(accepted["l4"]){
                        allow_s2 = true
                    }
                    if(allow_s2){
                        countLV1++
                        const continentDIV = document.createElement("tr")
                        continentDIV.innerHTML = `<td>${countLV1}</td><td>${element + "-" + el_c + "-" + el_sub + "-" + el_subsub}</td><td>${el_c == "FRA" ? "Departement" : "Sub-Subdivision"}</td><td>${data[element].get[el_c].get[el_sub].get[el_subsub].nameen ?? "N/A"}</td><td>${data[element].get[el_c].get[el_sub].get[el_subsub].namefr ?? "N/A"}</td><td>${data[element].get[el_c].get[el_sub].get[el_subsub].namejp ?? "N/A"}</td><td>${data[element].get[el_c].get[el_sub].get[el_subsub].namees ?? "N/A"}</td><td>${data[element].get[el_c].get[el_sub].get[el_subsub].nameit ?? "N/A"}</td><td>${data[element].get[el_c].get[el_sub].get[el_subsub].nameeo ?? "N/A"}</td><td>${data[element].get[el_c].get[el_sub].get[el_subsub].flag ? ('<img src="' + data[element].get[el_c].get[el_sub].get[el_subsub].flag + '">') : "N/A"}</td><td>${data[element].get[el_c].get[el_sub].get[el_subsub].population ?? "N/A"}</td><td>${data[element].get[el_c].get[el_sub].get[el_subsub].content ?? "N/A"}</td>`
                        document.getElementById("databaseTableBody").appendChild(continentDIV)
                    }
                }
            }
        }
    }
}

defineTable()

document.querySelectorAll('.tableFilterBtn, .tableFilterBtnActivated').forEach((element) => {
  element.addEventListener('click', (e) => {
    e.target.classList.toggle('tableFilterBtnActivated')
    e.target.classList.toggle('tableFilterBtn')
    accepted[e.target.id] = !accepted[e.target.id]
    defineTable()
  })
})