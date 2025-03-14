from django.contrib.auth import get_user_model
from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _

User = get_user_model()


class Quiz(models.Model):
    user = models.ForeignKey(
        User,
        verbose_name=_("User"),
        on_delete=models.CASCADE,
    )
    title = models.CharField(_("Title"), max_length=255)
    description = models.TextField(
        _("Description"),
        blank=True,
        default="",
    )

    class Meta:
        verbose_name = _("Quiz")
        verbose_name_plural = _("Quizzes")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Quiz_detail", kwargs={"pk": self.pk})


class QuizQuestion(models.Model):
    quiz = models.ForeignKey(
        Quiz,
        verbose_name=_("Quiz"),
        on_delete=models.CASCADE,
    )
    order = models.PositiveIntegerField(_("Order"))
    title = models.CharField(_("Title"), max_length=255)
    choices = models.JSONField(_("Choices"))
    correct_choice = models.CharField(_("Correct Choice"), max_length=1)

    class Meta:
        verbose_name = _("QuizQuestion")
        verbose_name_plural = _("QuizQuestions")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("QuizQuestion_detail", kwargs={"pk": self.pk})


class QuizHistory(models.Model):
    user = models.ForeignKey(
        User,
        verbose_name=_("User"),
        on_delete=models.CASCADE,
    )
    quiz = models.ForeignKey(
        Quiz,
        verbose_name=_("Quiz"),
        on_delete=models.CASCADE,
    )
    grade = models.FloatField(_("Grade"))

    class Meta:
        verbose_name = _("QuizHistory")
        verbose_name_plural = _("QuizHistorys")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("QuizHistory_detail", kwargs={"pk": self.pk})
