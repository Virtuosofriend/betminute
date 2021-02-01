<template>
    <div class="card__box">
        <div class="card__box-teams">
            <div>
                <h5 
                    class="team-names"
                >
                    {{ homeTeam }}
                        <span> {{ homePos }} </span>
                </h5>
            </div>

            <div>
                <h5 
                    class="team-names"
                >
                    {{ awayTeam }}
                        <span> {{ awayPos }} </span>
                </h5>
            </div>
        </div>
        <div class="card__box-minute">
            <div>
                <h5 
                    class="team-names"
                >
                    {{ homeScore }}
                    :
                    {{ awayScore }}
                </h5>
            </div>
            <div>
                <h5 
                    class="team-names"
                >
                    {{ minute }}'
                </h5>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "FavoriteGame__card",

    props: {
        addedTime: {
            required:   true
        },
        awayScore: {
            required:   true,
            type:       Number
        },
        awayPos: {
            required:   true,
        },
        awayTeam: {
            required:   true,
            type:       String
        },
        gameStatus: {
            required:   true,
            type:       String
        },
        homeScore: {
            required:   true,
            type:       Number
        },
        homeTeam: {
            required:   true,
            type:       String
        },
        homePos: {
            required:   true,
        },
        startingAt: {
            required:   true,
            type:       String
        },
        minute: {
            required:   true,
            type:       Number
        }
    }
}
</script>

<style lang="scss" scoped>
.card__box {
    display: flex;
    align-items: center;
}

.card__box > div {
    width: 100%;
}

.card__box-teams {
    display: flex;
    flex-direction: column;
    padding-left: 12px;
}

.card__box-minute {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.team-names {
    font-weight: 600;
    text-transform: initial;
    width: 160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.team-names span {
	color: var(--theme-dark-subtitle);
	font-weight: 400;
	font-size: 10px;
	margin-left: .3em;
}
</style>