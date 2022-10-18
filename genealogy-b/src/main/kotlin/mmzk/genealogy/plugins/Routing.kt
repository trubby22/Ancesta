package mmzk.genealogy.plugins

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import mmzk.genealogy.dao.Individual
import mmzk.genealogy.dto.IndividualDTO
import mmzk.genealogy.search.Database
import mmzk.genealogy.search.WikiData
import mmzk.genealogy.tables.IndividualTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

fun Application.configureRouting() {
    Database.init()
    routing {
        get("/") {
            call.respondText("Hello World!")
        }

        get("/everything") {
            val allPeople = transaction {
                addLogger(StdOutSqlLogger)
                SchemaUtils.create(IndividualTable)
                Individual.all().map(::IndividualDTO)
            }
            call.respond(allPeople)
        }

        get("/test") {
            call.respond(WikiData.query(listOf("Q9685", "Q9682")))
        }

        get("/search") {
            call.request.queryParameters["q"]?.let { name ->
                val peopleWithMatchedName = Database.findPersonByName(name)
                call.respond(peopleWithMatchedName)
            } ?: call.respond(
                HttpStatusCode.BadRequest,
                "error" to "Missing query parameter \"q\"!"
            )
        }

        get("/relations") {
            call.request.queryParameters["id"]?.let { id ->
                val typeFilter = call.request.queryParameters["types"]?.split(",")
                val result = Database.findRelatedPeople(id, typeFilter)
                call.respond(result)
            } ?: call.respond(
                HttpStatusCode.BadRequest,
                "error" to "Missing query parameter \"id\"!"
            )
        }
    }
}
