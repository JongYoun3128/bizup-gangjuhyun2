// 연락처 저장 기능 (vCard 형식)
function saveContact() {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:강주현
N:강;주현;;;
ORG:ZEROKING
TITLE:총괄디렉터
TEL;TYPE=CELL:010-9806-3433
EMAIL:matching25.kor@gmail.com
ADR;TYPE=WORK:;;벚꽃로 286 삼성리더스타워 1101호;가산동;금천구;;서울
URL:${window.location.href}
END:VCARD`;

    const blob = new Blob([vCard], {
        type: "text/vcard;charset=utf-8",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ZEROKING_강주현_총괄디렉터.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    alert("연락처가 다운로드되었습니다!");
}

// 공유하기 기능 - 모달 열기
function shareCard() {
    document.getElementById("shareModal").style.display = "flex";
}

// 모달 닫기
function closeShareModal() {
    document.getElementById("shareModal").style.display = "block";
}

// 모달 외부 클릭시 닫기
window.onclick = function (event) {
    const modal = document.getElementById("shareModal");
    if (event.target === modal) {
        closeShareModal();
    }
};

// 카카오톡 공유
function shareKakao() {
    const url = window.location.href;
    const text =
        "ZEROKING 강주현 총괄디렉터의 명함입니다.\n전화: 010-9806-3433\n이메일: matching25.kor@gmail.com";

    // 모바일에서 카카오톡 앱으로 공유
    const kakaoUrl = `https://sharer.kakao.com/talk/friends/picker/link?app_key=YOUR_APP_KEY&validation_action=default&validation_params={"link_url":"${encodeURIComponent(
        url
    )}"}`;

    // 간단한 카카오톡 공유 (URL 스키마)
    const message = `${text}\n\n${url}`;
    const shareUrl = `kakaotalk://send?text=${encodeURIComponent(message)}`;

    window.location.href = shareUrl;

    // 카카오톡이 설치되어 있지 않으면 웹 공유로 폴백
    setTimeout(() => {
        if (
            confirm(
                "카카오톡이 설치되어 있지 않습니다.\n링크를 복사하시겠습니까?"
            )
        ) {
            copyToClipboard();
        }
    }, 1000);

    closeShareModal();
}

// 라인 공유
function shareLine() {
    const url = window.location.href;
    const text = "ZEROKING 강주현 총괄디렉터의 명함입니다";

    const lineUrl = `https://line.me/R/share?text=${encodeURIComponent(
        text + "\n" + url
    )}`;
    window.open(lineUrl, "_blank");

    closeShareModal();
}

// 이메일 공유
function shareEmail() {
    const subject = "ZEROKING - 강주현 총괄디렉터 명함";
    const body = `ZEROKING 강주현 총괄디렉터의 명함입니다.

회사: ZEROKING
총괄디렉터: 강주현
전화: 010-9806-3433
이메일: matching25.kor@gmail.com
주소: 금천구 가산동 벚꽃로 286 삼성리더스타워 1101호

명함 보기: ${window.location.href}`;

    const mailtoUrl = `mailto:?subject=${encodeURIComponent(
        subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    closeShareModal();
}

// 문자 메시지 공유
function shareSMS() {
    const text = `ZEROKING 강주현 총괄디렉터의 명함입니다.\n\n전화: 010-9806-3433\n이메일: matching25.kor@gmail.com\n\n명함 보기: ${window.location.href}`;

    // iOS와 Android 모두 지원
    const smsUrl = `sms:?body=${encodeURIComponent(text)}`;
    window.location.href = smsUrl;

    closeShareModal();
}

// URL 클립보드 복사
function copyToClipboard() {
    const url = window.location.href;

    if (navigator.clipboard) {
        navigator.clipboard
            .writeText(url)
            .then(() => {
                alert("명함 링크가 복사되었습니다!");
            })
            .catch(() => {
                fallbackCopyToClipboard(url);
            });
    } else {
        fallbackCopyToClipboard(url);
    }
}

// 클립보드 복사 fallback
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand("copy");
        alert("명함 링크가 복사되었습니다!");
    } catch (err) {
        alert("링크 복사 실패. URL을 수동으로 복사해주세요:\n" + text);
    }

    document.body.removeChild(textArea);
}
