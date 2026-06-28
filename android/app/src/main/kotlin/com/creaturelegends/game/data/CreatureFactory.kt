package com.creaturelegends.game.data

object CreatureFactory {
    fun createBlazeFox(): Creature = Creature(
        id = 1,
        name = "Blaze Fox",
        type = CreatureType.FIRE,
        maxHp = 39,
        attack = 52,
        defense = 43,
        speed = 60,
        moves = listOf(
            Move(1, "Ember", CreatureType.FIRE, 40, 100),
            Move(2, "Tackle", CreatureType.NORMAL, 40, 100),
            Move(3, "Growl", CreatureType.NORMAL, 0, 100)
        )
    )

    fun createAquaShell(): Creature = Creature(
        id = 2,
        name = "Aqua Shell",
        type = CreatureType.WATER,
        maxHp = 44,
        attack = 48,
        defense = 65,
        speed = 43,
        moves = listOf(
            Move(4, "Water Gun", CreatureType.WATER, 40, 100),
            Move(5, "Bubble", CreatureType.WATER, 20, 100),
            Move(6, "Harden", CreatureType.WATER, 0, 100)
        )
    )

    fun createLeafSprout(): Creature = Creature(
        id = 3,
        name = "Leaf Sprout",
        type = CreatureType.GRASS,
        maxHp = 45,
        attack = 49,
        defense = 49,
        speed = 45,
        moves = listOf(
            Move(7, "Vine Whip", CreatureType.GRASS, 45, 100),
            Move(8, "Powder Spore", CreatureType.GRASS, 20, 75),
            Move(9, "Absorb", CreatureType.GRASS, 20, 100)
        )
    )

    fun createThunderBird(): Creature = Creature(
        id = 4,
        name = "Thunder Bird",
        type = CreatureType.ELECTRIC,
        maxHp = 35,
        attack = 55,
        defense = 40,
        speed = 90,
        moves = listOf(
            Move(10, "Thunder Shock", CreatureType.ELECTRIC, 40, 100),
            Move(11, "Peck", CreatureType.FLYING, 35, 100),
            Move(12, "Thunder Wave", CreatureType.ELECTRIC, 0, 90)
        )
    )

    fun createRandomCreature(): Creature {
        return listOf(
            createBlazeFox(),
            createAquaShell(),
            createLeafSprout(),
            createThunderBird()
        ).random()
    }

    fun getCreaturesByType(type: CreatureType): List<Creature> {
        return listOf(
            createBlazeFox(),
            createAquaShell(),
            createLeafSprout(),
            createThunderBird()
        ).filter { it.type == type }
    }
}
