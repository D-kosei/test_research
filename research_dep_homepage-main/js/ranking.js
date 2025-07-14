// ランキングデータの管理
class RankingManager {
    constructor() {
        this.STORAGE_KEY = 'charider_scores';
        this.MAX_SCORES = 8; // 保存するスコアの最大数
    }

    // スコアを保存
    saveScore(score) {
        const scores = this.getScores();
        const newScore = {
            score: score,
            date: new Date().toLocaleString()
        };
        
        scores.push(newScore);
        // スコアで降順ソート
        scores.sort((a, b) => b.score - a.score);
        // 上位MAX_SCORES件のみ保持
        const topScores = scores.slice(0, this.MAX_SCORES);
        
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(topScores));
    }

    // 保存されているスコアを取得
    getScores() {
        const scoresJson = localStorage.getItem(this.STORAGE_KEY);
        return scoresJson ? JSON.parse(scoresJson) : [];
    }
}

// ランキング表示の管理
class RankingDisplay {
    constructor(rankingManager) {
        this.rankingManager = rankingManager;
        this.rankingList = document.getElementById('ranking-list');
    }

    // ランキングを表示
    displayRanking() {
        const scores = this.rankingManager.getScores();
        this.rankingList.innerHTML = ''; // 一旦クリア

        scores.forEach((scoreData, index) => {
            const rankingItem = document.createElement('div');
            rankingItem.className = 'ranking-item';
            
            rankingItem.innerHTML = `
                <span class="rank">${index + 1}</span>
                <span class="score">${scoreData.score}</span>
                <span class="date">${scoreData.date}</span>
            `;
            
            this.rankingList.appendChild(rankingItem);
        });

        // スコアがない場合のメッセージを表示
        if (scores.length === 0) {
            const noScoreMessage = document.createElement('div');
            noScoreMessage.className = 'ranking-item';
            noScoreMessage.innerHTML = '<span class="no-score" style="grid-column: 1 / -1; text-align: center;">まだスコアがありません</span>';
            this.rankingList.appendChild(noScoreMessage);
        }
    }
}

// メイン処理
document.addEventListener('DOMContentLoaded', () => {
    const rankingManager = new RankingManager();
    const rankingDisplay = new RankingDisplay(rankingManager);
    
    // URLパラメータからスコアを取得して保存（ゲーム画面からの遷移時）
    const urlParams = new URLSearchParams(window.location.search);
    const newScore = urlParams.get('score');
    
    if (newScore && !isNaN(newScore)) {
        rankingManager.saveScore(parseInt(newScore));
    }
    
    // ランキングを表示
    rankingDisplay.displayRanking();
});
